import assert from 'node:assert/strict';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CORE_AGENT_FILES = [
  '.codex/agents/product-planner.toml',
  '.codex/agents/product-designer.toml',
  '.codex/agents/frontend-architect.toml',
  '.codex/agents/frontend-developer.toml',
  '.codex/agents/qa-engineer.toml',
  '.codex/agents/code-reviewer.toml',
  '.codex/agents/security-reviewer.toml',
];

const REQUIRED_FILES = [
  'AGENTS.md',
  '.agents/skills/orchestrating-myungjoo-development/SKILL.md',
  '.agents/skills/orchestrating-myungjoo-development/references/routing-matrix.md',
  '.agents/skills/orchestrating-myungjoo-development/references/quality-gates.md',
  '.agents/skills/orchestrating-myungjoo-development/references/handoff-contracts.md',
  '.codex/config.toml',
  ...CORE_AGENT_FILES,
];

const SKILL_FILE = '.agents/skills/orchestrating-myungjoo-development/SKILL.md';
const REFERENCE_FILES = [
  '.agents/skills/orchestrating-myungjoo-development/references/routing-matrix.md',
  '.agents/skills/orchestrating-myungjoo-development/references/quality-gates.md',
  '.agents/skills/orchestrating-myungjoo-development/references/handoff-contracts.md',
];
const AGENT_FILES = CORE_AGENT_FILES;
const AGENT_FILENAMES = new Set(AGENT_FILES.map(agentFile => path.basename(agentFile)));
const POLICY_KEYWORDS = ['승인', 'develop', 'PR', '외부 변경'];

function readFile(rootDir, relativePath, errors) {
  const targetPath = path.join(rootDir, relativePath);

  if (!existsSync(targetPath)) {
    errors.push(`필수 파일 누락: ${relativePath}`);
    return null;
  }

  try {
    return readFileSync(targetPath, 'utf8');
  } catch {
    errors.push(`파일을 읽을 수 없음: ${relativePath}`);
    return null;
  }
}

function hasFrontmatterField(frontmatter, field) {
  return new RegExp(`^${field}:\\s*\\S`, 'm').test(frontmatter);
}

function writeFixtureFile(rootDir, relativePath, content) {
  const targetPath = path.join(rootDir, relativePath);
  mkdirSync(path.dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, content, 'utf8');
}

function stripTrailingComment(line) {
  let escaped = false;
  let inString = false;
  let inTripleString = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (line.slice(index, index + 3) === '"""') {
      inTripleString = !inTripleString;
      index += 2;
      continue;
    }
    if (inTripleString) {
      continue;
    }
    if (inString && escaped) {
      escaped = false;
    } else if (inString && character === '\\') {
      escaped = true;
    } else if (character === '"') {
      inString = !inString;
    } else if (!inString && character === '#') {
      return line.slice(0, index).trimEnd();
    }
  }

  return line;
}

function isValidBasicString(value) {
  if (value.length < 2 || !value.startsWith('"') || !value.endsWith('"')) {
    return false;
  }

  for (let index = 1; index < value.length - 1; index += 1) {
    if (value[index] === '"') {
      return false;
    }
    if (value[index] !== '\\') {
      continue;
    }

    const escape = value[index + 1];
    if ('btnfr"\\'.includes(escape)) {
      index += 1;
      continue;
    }
    if (escape === 'u' || escape === 'U') {
      const length = escape === 'u' ? 4 : 8;
      const codePoint = value.slice(index + 2, index + 2 + length);
      if (codePoint.length === length && /^[0-9A-Fa-f]+$/.test(codePoint)) {
        index += length + 1;
        continue;
      }
    }
    return false;
  }

  return true;
}

function parseRestrictedToml(content) {
  const topLevel = new Map();
  const tables = new Map();
  const errors = [];
  let current = topLevel;
  let currentTable = null;
  let openDeveloperInstructions = null;

  for (const [index, rawLine] of content.split(/\r?\n/).entries()) {
    const line = stripTrailingComment(rawLine).trim();
    const lineNumber = index + 1;

    if (openDeveloperInstructions !== null) {
      if (line === '"""') {
        openDeveloperInstructions.record.value = openDeveloperInstructions.lines.join('\n');
        openDeveloperInstructions = null;
      } else {
        openDeveloperInstructions.lines.push(rawLine);
      }
      continue;
    }

    if (line === '' || line.startsWith('#')) {
      continue;
    }

    const tableMatch = line.match(/^\[([A-Za-z][A-Za-z0-9_.-]*)\]$/);
    if (tableMatch !== null) {
      const tableName = tableMatch[1];

      if (tables.has(tableName)) {
        errors.push({ type: 'duplicate-table', value: tableName });
        current = tables.get(tableName);
        currentTable = tableName;
      } else {
        current = new Map();
        currentTable = tableName;
        tables.set(tableName, current);
      }
      continue;
    }

    const assignmentMatch = line.match(/^([A-Za-z][A-Za-z0-9_.-]*)\s*=\s*(.+)$/);
    if (assignmentMatch === null) {
      errors.push({ type: 'syntax', value: String(lineNumber) });
      continue;
    }

    const key = assignmentMatch[1];
    const value = assignmentMatch[2];
    if (current.has(key)) {
      errors.push({ type: 'duplicate-key', value: `${currentTable ?? 'top'}:${key}` });
      continue;
    }

    const multilineTripleString = value === '"""';
    const inlineTripleString = value.match(/^"""([\s\S]*)"""$/);
    const type =
      multilineTripleString || inlineTripleString !== null
        ? 'triple'
        : isValidBasicString(value)
          ? 'string'
          : /^(?:0|[1-9]\d*)$/.test(value)
            ? 'number'
            : null;
    if (type === null) {
      errors.push({ type: 'syntax', value: String(lineNumber) });
      continue;
    }

    const record = {
      type,
      value: type === 'triple' ? (inlineTripleString?.[1] ?? '') : value.slice(1, -1),
    };
    current.set(key, record);

    if (multilineTripleString) {
      openDeveloperInstructions = { key, lines: [], record, table: currentTable };
    }
  }

  if (openDeveloperInstructions !== null) {
    errors.push({ type: 'unclosed-developer-instructions', value: openDeveloperInstructions.key });
  }

  return { topLevel, tables, errors };
}

function getAgentFiles(rootDir) {
  const agentsDir = path.join(rootDir, '.codex/agents');
  if (!existsSync(agentsDir)) {
    return [];
  }

  return readdirSync(agentsDir, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.toml'))
    .map(entry => `.codex/agents/${entry.name}`);
}

function validateAgentFileSet(rootDir, errors) {
  const actual = new Set(getAgentFiles(rootDir).map(agentFile => path.basename(agentFile)));
  const missing = [...AGENT_FILENAMES].filter(filename => !actual.has(filename));

  if (missing.length > 0) {
    errors.push(`agent 파일 집합 불일치: missing=${missing.sort().join(',')}`);
  }
}

function validateAgentToml(agent, role, errors) {
  const parsed = parseRestrictedToml(agent);

  for (const issue of parsed.errors) {
    if (issue.type === 'unclosed-developer-instructions') {
      errors.push(`agent TOML developer_instructions 종료 누락: ${role}`);
    } else if (issue.type === 'duplicate-key') {
      errors.push(`agent TOML key 중복: ${role}:${issue.value.split(':').at(-1)}`);
    } else if (issue.type === 'duplicate-table') {
      errors.push(`agent TOML table 중복: ${role}:${issue.value}`);
    } else {
      errors.push(`agent TOML 구문 오류: ${role}:${issue.value}`);
    }
  }

  for (const table of parsed.tables.keys()) {
    errors.push(`agent TOML 허용되지 않은 table: ${role}:${table}`);
  }

  const allowedKeys = new Set([
    'name',
    'description',
    'sandbox_mode',
    'developer_instructions',
    'model',
    'model_reasoning_effort',
  ]);
  for (const key of parsed.topLevel.keys()) {
    if (!allowedKeys.has(key)) {
      errors.push(`agent TOML 허용되지 않은 key: ${role}:${key}`);
    }
  }

  const requiredFields = {
    name: 'string',
    description: 'string',
    sandbox_mode: 'string',
    developer_instructions: 'triple',
  };
  for (const [field, type] of Object.entries(requiredFields)) {
    const record = parsed.topLevel.get(field);
    if (record === undefined) {
      errors.push(`agent 필수 key 누락: ${role}:${field}`);
    } else if (record.type !== type) {
      errors.push(`agent 필수 key 타입 불일치: ${role}:${field}`);
    }
  }

  for (const field of ['model', 'model_reasoning_effort']) {
    const record = parsed.topLevel.get(field);
    if (record !== undefined && record.type !== 'string') {
      errors.push(`agent 선택 key 타입 불일치: ${role}:${field}`);
    }
  }

  return parsed;
}

function validateConfigToml(config, errors) {
  const parsed = parseRestrictedToml(config);
  const expectedTables = new Set(['agents']);

  for (const issue of parsed.errors) {
    if (issue.type === 'duplicate-table') {
      errors.push(`config TOML table 중복: ${issue.value}`);
    } else if (issue.type === 'duplicate-key') {
      errors.push(`config TOML key 중복: ${issue.value}`);
    } else {
      errors.push(`config TOML 구문 오류: ${issue.value}`);
    }
  }

  const actualTables = new Set(parsed.tables.keys());
  const missing = [...expectedTables].filter(table => !actualTables.has(table));
  const unexpected = [...actualTables].filter(table => !expectedTables.has(table));
  if (missing.length > 0) {
    errors.push(`config table 집합 불일치: missing=${missing.sort().join(',')}`);
  }
  if (unexpected.length > 0) {
    errors.push(`config table 집합 불일치: unexpected=${unexpected.sort().join(',')}`);
  }

  const rootFields = ['model', 'model_reasoning_effort'];
  for (const key of parsed.topLevel.keys()) {
    if (!rootFields.includes(key)) {
      errors.push(`config TOML 허용되지 않은 key: top:${key}`);
    }
  }
  for (const field of rootFields) {
    if (parsed.topLevel.get(field)?.type !== 'string') {
      errors.push(`config 필수 key 타입 불일치: top:${field}`);
    }
  }

  const agentsTable = parsed.tables.get('agents');
  if (agentsTable !== undefined) {
    for (const key of agentsTable.keys()) {
      if (
        ![
          'default_subagent_model',
          'default_subagent_reasoning_effort',
          'max_concurrent_threads_per_session',
        ].includes(key)
      ) {
        errors.push(`config TOML 허용되지 않은 key: agents:${key}`);
      }
    }

    const requiredAgentsFields = {
      default_subagent_model: 'string',
      default_subagent_reasoning_effort: 'string',
      max_concurrent_threads_per_session: 'number',
    };
    for (const [field, type] of Object.entries(requiredAgentsFields)) {
      if (agentsTable.get(field)?.type !== type) {
        errors.push(`config 필수 key 타입 불일치: agents:${field}`);
      }
    }
  } else {
    errors.push('config 필수 table 누락: agents');
  }
}

function createAgentFixture(role) {
  return `name = "${role}"
description = "fixture"
sandbox_mode = "read-only"
developer_instructions = """
fixture
"""`;
}

export function validateHarness(rootDir) {
  const errors = [];
  const contents = new Map();

  for (const requiredFile of REQUIRED_FILES) {
    contents.set(requiredFile, readFile(rootDir, requiredFile, errors));
  }
  validateAgentFileSet(rootDir, errors);

  const skill = contents.get(SKILL_FILE);
  if (skill !== null) {
    const frontmatter = skill.match(/^---\r?\n([\s\S]*?)\r?\n---/);

    if (frontmatter === null) {
      errors.push(`skill frontmatter 누락: ${SKILL_FILE}`);
    } else {
      for (const field of ['name', 'description']) {
        if (!hasFrontmatterField(frontmatter[1], field)) {
          errors.push(`skill frontmatter ${field} 누락: ${SKILL_FILE}`);
        }
      }
    }
  }

  const policyDocuments = [...contents.values()].filter(content => content !== null).join('\n');
  for (const keyword of POLICY_KEYWORDS) {
    if (!policyDocuments.includes(keyword)) {
      errors.push(`정책 키워드 누락: ${keyword}`);
    }
  }

  for (const agentFile of getAgentFiles(rootDir)) {
    const agent = contents.get(agentFile) ?? readFile(rootDir, agentFile, errors);
    const role = path.basename(agentFile, '.toml');

    if (agent === null) {
      continue;
    }

    const parsedAgent = validateAgentToml(agent, role, errors);
  }

  const config = contents.get('.codex/config.toml');
  if (config !== null) {
    validateConfigToml(config, errors);
  }

  const packageJson = readFile(rootDir, 'package.json', errors);
  if (packageJson !== null) {
    try {
      const scripts = JSON.parse(packageJson).scripts;
      for (const name of ['verify', 'verify:harness', 'test:harness']) {
        if (typeof scripts?.[name] !== 'string') {
          errors.push(`package.json script 타입 불일치: ${name}`);
        }
      }
    } catch {
      errors.push('package.json 파싱 실패');
    }
  }

  return errors;
}

function runSelfTest() {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), 'verify-agent-harness-'));

  try {
    assert.ok(validateHarness(tempDir).some(error => error.includes('필수 파일 누락')));

    const policyContent = '사용자 승인 전에는 develop 대상 PR과 외부 변경을 진행하지 않는다.';
    const skillContent = `---\nname: fixture\ndescription: fixture\n---\n${policyContent}`;
    writeFixtureFile(tempDir, 'AGENTS.md', policyContent);
    writeFixtureFile(tempDir, SKILL_FILE, skillContent);
    for (const referenceFile of REFERENCE_FILES) {
      writeFixtureFile(tempDir, referenceFile, '# fixture');
    }
    for (const agentFile of AGENT_FILES) {
      writeFixtureFile(tempDir, agentFile, createAgentFixture(path.basename(agentFile, '.toml')));
    }

    const configContent = `model = "gpt-5.6-sol"
model_reasoning_effort = "medium"

[agents]
default_subagent_model = "gpt-5.6-terra"
default_subagent_reasoning_effort = "medium"
max_concurrent_threads_per_session = 3`;
    writeFixtureFile(tempDir, '.codex/config.toml', configContent);
    writeFixtureFile(
      tempDir,
      'package.json',
      JSON.stringify({
        scripts: {
          verify: 'pnpm verify',
          'verify:harness': 'node verify.mjs',
          'test:harness': 'node verify.mjs --self-test',
        },
      })
    );

    assert.deepEqual(validateHarness(tempDir), []);

    writeFixtureFile(
      tempDir,
      'package.json',
      JSON.stringify({ scripts: { verify: 'pnpm verify', 'verify:harness': 'node verify.mjs' } })
    );
    assert.ok(
      validateHarness(tempDir).some(
        error => error === 'package.json script 타입 불일치: test:harness'
      )
    );

    writeFixtureFile(
      tempDir,
      'package.json',
      JSON.stringify({
        scripts: {
          verify: 'pnpm verify',
          'verify:harness': 'node verify.mjs',
          'test:harness': 3,
        },
      })
    );
    assert.ok(
      validateHarness(tempDir).some(
        error => error === 'package.json script 타입 불일치: test:harness'
      )
    );
    writeFixtureFile(
      tempDir,
      'package.json',
      JSON.stringify({
        scripts: {
          verify: 'pnpm verify',
          'verify:harness': 'node verify.mjs',
          'test:harness': 'node verify.mjs --self-test',
        },
      })
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/additional-agent.toml',
      createAgentFixture('additional-agent')
    );
    assert.deepEqual(validateHarness(tempDir), []);

    writeFixtureFile(
      tempDir,
      '.codex/agents/additional-agent.toml',
      'name = "additional-agent"\n잘못된 TOML'
    );
    assert.ok(
      validateHarness(tempDir).some(error => error === 'agent TOML 구문 오류: additional-agent:2')
    );
    writeFixtureFile(
      tempDir,
      '.codex/agents/additional-agent.toml',
      createAgentFixture('additional-agent')
    );
    rmSync(path.join(tempDir, '.codex/agents/additional-agent.toml'));

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      `name = "product-planner" # 후행 주석
description = "fixture \\"문자열\\""
sandbox_mode = "read-only"
developer_instructions = """한 줄 지시문""" # 후행 주석`
    );
    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace('model = "gpt-5.6-sol"', 'model = "gpt-5.6-sol" # 후행 주석')
    );
    assert.deepEqual(validateHarness(tempDir), []);

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace('model = "gpt-5.6-sol"', 'model = "gpt-5.6-\\q-sol"')
    );
    assert.ok(validateHarness(tempDir).some(error => error === 'config TOML 구문 오류: 1'));

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace(
        'max_concurrent_threads_per_session = 3',
        'max_concurrent_threads_per_session = 03'
      )
    );
    assert.ok(validateHarness(tempDir).some(error => error === 'config TOML 구문 오류: 7'));
    writeFixtureFile(tempDir, '.codex/config.toml', configContent);
    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner')
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').replace(
        'developer_instructions',
        'model = "fixture"\nmodel_reasoning_effort = "medium"\ndeveloper_instructions'
      )
    );
    assert.deepEqual(validateHarness(tempDir), []);
    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner')
    );

    writeFixtureFile(
      tempDir,
      SKILL_FILE,
      skillContent.replace(policyContent, '승인 없이 develop PR 또는 외부 변경을 실행하지 않는다.')
    );
    assert.deepEqual(validateHarness(tempDir), []);
    writeFixtureFile(tempDir, SKILL_FILE, skillContent);

    writeFixtureFile(
      tempDir,
      'package.json',
      JSON.stringify({
        scripts: {
          verify: 'pnpm lint && pnpm test',
          'verify:harness': 'node verify.mjs --self-test',
          'test:harness': 'node verify.mjs --test',
        },
      })
    );
    assert.deepEqual(validateHarness(tempDir), []);

    rmSync(path.join(tempDir, '.codex/agents/product-designer.toml'));
    assert.ok(
      validateHarness(tempDir).some(
        error => error === 'agent 파일 집합 불일치: missing=product-designer.toml'
      )
    );
    writeFixtureFile(
      tempDir,
      '.codex/agents/product-designer.toml',
      createAgentFixture('product-designer')
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace('model = "gpt-5.6-sol"', 'model = 3')
    );
    assert.ok(
      validateHarness(tempDir).some(error => error === 'config 필수 key 타입 불일치: top:model')
    );
    writeFixtureFile(tempDir, '.codex/config.toml', configContent);

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').replace('description = "fixture"', 'description = 4')
    );
    assert.ok(
      validateHarness(tempDir).some(
        error => error === 'agent 필수 key 타입 불일치: product-planner:description'
      )
    );
    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner')
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').replace(
        'developer_instructions = """\nfixture\n"""',
        ''
      )
    );
    assert.ok(
      validateHarness(tempDir).some(
        error => error === 'agent 필수 key 누락: product-planner:developer_instructions'
      )
    );
    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner')
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace(
        'default_subagent_model = "gpt-5.6-terra"',
        'default_subagent_model = 3'
      )
    );
    assert.ok(
      validateHarness(tempDir).some(
        error => error === 'config 필수 key 타입 불일치: agents:default_subagent_model'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace(
        'default_subagent_reasoning_effort = "medium"',
        'default_subagent_reasoning_effort = 3'
      )
    );
    assert.ok(
      validateHarness(tempDir).some(
        error => error === 'config 필수 key 타입 불일치: agents:default_subagent_reasoning_effort'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace(
        'max_concurrent_threads_per_session = 3',
        'max_concurrent_threads_per_session = "3"'
      )
    );
    assert.ok(
      validateHarness(tempDir).some(
        error => error === 'config 필수 key 타입 불일치: agents:max_concurrent_threads_per_session'
      )
    );
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }

  console.log('하네스 self-test 통과');
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  if (process.argv.includes('--self-test')) {
    runSelfTest();
  } else {
    const errors = validateHarness(process.cwd());

    if (errors.length === 0) {
      console.log('하네스 계약 검사 통과');
    } else {
      console.error(errors.join('\n'));
      process.exitCode = 1;
    }
  }
}
