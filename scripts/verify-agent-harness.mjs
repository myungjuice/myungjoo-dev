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

const REQUIRED_FILES = [
  'AGENTS.md',
  '.agents/skills/orchestrating-myungjoo-development/SKILL.md',
  '.agents/skills/orchestrating-myungjoo-development/references/routing-matrix.md',
  '.agents/skills/orchestrating-myungjoo-development/references/quality-gates.md',
  '.agents/skills/orchestrating-myungjoo-development/references/handoff-contracts.md',
  '.codex/config.toml',
  '.codex/agents/product-planner.toml',
  '.codex/agents/product-designer.toml',
  '.codex/agents/frontend-architect.toml',
  '.codex/agents/frontend-developer.toml',
  '.codex/agents/qa-engineer.toml',
  '.codex/agents/code-reviewer.toml',
  '.codex/agents/security-reviewer.toml',
  '.github/workflows/quality.yml',
];

const SKILL_CONTRACTS = [
  'lightweight',
  'standard',
  'high-risk',
  '요청 접수 시',
  '구현 직전',
  '리뷰 직전',
  '구현자와 독립',
  'Git worktree',
  '--no-verify',
  'Draft PR',
];

const SKILL_FILE = REQUIRED_FILES[1];
const REFERENCE_FILES = REQUIRED_FILES.slice(2, 5);
const AGENT_FILES = REQUIRED_FILES.slice(6, 13);
const AGENT_ROLES = AGENT_FILES.map(agentFile => path.basename(agentFile, '.toml'));
const AGENT_FILENAMES = new Set(AGENT_FILES.map(agentFile => path.basename(agentFile)));
const AGENT_SANDBOX_MODES = {
  'product-planner': 'read-only',
  'product-designer': 'read-only',
  'frontend-architect': 'read-only',
  'frontend-developer': 'workspace-write',
  'qa-engineer': 'read-only',
  'code-reviewer': 'read-only',
  'security-reviewer': 'read-only',
};
const AGENT_RESPONSIBILITIES = {
  'product-planner': '문제, 대상 사용자, 사용자 가치, 범위, 제외 범위와 완료 조건',
  'product-designer':
    '화면의 정상·빈·로딩·오류 상태, 기존 shadcn/ui 재사용, 접근성, 반응형과 다크 모드 기준',
  'frontend-architect': 'Server/Client 경계, 상태, 데이터, 성능, SEO, 테스트와 복구 전략',
  'frontend-developer': '승인된 단일 task 범위만 수정한다.',
  'qa-engineer': '완료 조건, 회귀 범위, 브라우저·키보드·언어·테마 검증 증거',
  'code-reviewer': '구현자와 독립적으로 correctness, 회귀, 타입과 테스트 공백',
  'security-reviewer': 'secret, XSS, 입력, 외부 API, 개인정보와 GitHub 권한의 신뢰 경계와 위험',
};
const APPROVAL_CONTRACT =
  '사용자 승인이 필요한 범위가 발견되면 구현을 제안만 하고 변경하지 않는다.';
const DELEGATION_CONTRACT = '하위 agent에 작업을 위임하지 않는다.';
const HANDOFF_CONTRACT = [
  '1. 상태: DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED',
  '2. 결론',
  '3. 근거',
  '4. 산출물',
  '5. 검증',
  '6. 미결정·위험',
  '7. 다음 역할 입력',
].join('\n');
const FORBIDDEN_MODEL_SETTINGS = [
  'model',
  'model_reasoning_effort',
  'default_subagent_model',
  'default_subagent_reasoning_effort',
];

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

function hasTomlStringValue(content, field, value) {
  return new RegExp(`^${field}\\s*=\\s*"${value}"\\s*$`, 'm').test(content);
}

function hasTomlField(content, field) {
  return new RegExp(`^${field}\\s*=`, 'm').test(content);
}

function hasHandoffContract(agent) {
  return agent.includes(HANDOFF_CONTRACT);
}

function parseRestrictedToml(content) {
  const topLevel = new Map();
  const tables = new Map();
  const errors = [];
  let current = topLevel;
  let currentTable = null;
  let openDeveloperInstructions = null;

  for (const [index, rawLine] of content.split(/\r?\n/).entries()) {
    const line = rawLine.trim();
    const lineNumber = index + 1;

    if (openDeveloperInstructions !== null) {
      if (line === '"""') {
        openDeveloperInstructions = null;
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

    const tripleStringMatch = line.match(/^([A-Za-z][A-Za-z0-9_.-]*)\s*=\s*"""$/);
    const stringMatch = line.match(/^([A-Za-z][A-Za-z0-9_.-]*)\s*=\s*"([^"]*)"$/);
    const numberMatch = line.match(/^([A-Za-z][A-Za-z0-9_.-]*)\s*=\s*(\d+)$/);
    const match = tripleStringMatch ?? stringMatch ?? numberMatch;

    if (match === null) {
      errors.push({ type: 'syntax', value: String(lineNumber) });
      continue;
    }

    const key = match[1];
    if (current.has(key)) {
      errors.push({ type: 'duplicate-key', value: `${currentTable ?? 'top'}:${key}` });
      continue;
    }

    const type = tripleStringMatch !== null ? 'triple' : stringMatch !== null ? 'string' : 'number';
    current.set(key, { type, value: type === 'triple' ? '' : match[2] });

    if (type === 'triple') {
      openDeveloperInstructions = { key, table: currentTable };
    }
  }

  if (openDeveloperInstructions !== null) {
    errors.push({ type: 'unclosed-developer-instructions', value: openDeveloperInstructions.key });
  }

  return { topLevel, tables, errors };
}

function validateAgentFileSet(rootDir, errors) {
  const agentsDir = path.join(rootDir, '.codex/agents');
  const actual = existsSync(agentsDir)
    ? new Set(
        readdirSync(agentsDir, { withFileTypes: true })
          .filter(entry => entry.isFile() && entry.name.endsWith('.toml'))
          .map(entry => entry.name)
      )
    : new Set();
  const missing = [...AGENT_FILENAMES].filter(filename => !actual.has(filename));
  const unexpected = [...actual].filter(filename => !AGENT_FILENAMES.has(filename));

  if (missing.length > 0) {
    errors.push(`agent 파일 집합 불일치: missing=${missing.sort().join(',')}`);
  }
  if (unexpected.length > 0) {
    errors.push(`agent 파일 집합 불일치: unexpected=${unexpected.sort().join(',')}`);
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

  const allowedKeys = new Set(['name', 'description', 'sandbox_mode', 'developer_instructions']);
  for (const key of parsed.topLevel.keys()) {
    if (!allowedKeys.has(key)) {
      errors.push(`agent TOML 허용되지 않은 key: ${role}:${key}`);
    }
  }

  if (parsed.topLevel.get('developer_instructions')?.type !== 'triple') {
    errors.push(`agent TOML developer_instructions 문법 불일치: ${role}`);
  }
}

function validateConfigToml(config, errors) {
  const parsed = parseRestrictedToml(config);
  const expectedTables = new Set(['agents', ...AGENT_ROLES.map(role => `agents.${role}`)]);

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

  for (const key of parsed.topLevel.keys()) {
    errors.push(`config TOML 허용되지 않은 key: top:${key}`);
  }

  const agentsTable = parsed.tables.get('agents');
  if (agentsTable !== undefined) {
    for (const key of agentsTable.keys()) {
      if (key !== 'max_concurrent_threads_per_session') {
        errors.push(`config TOML 허용되지 않은 key: agents:${key}`);
      }
    }
    const concurrency = agentsTable.get('max_concurrent_threads_per_session');
    if (concurrency?.type !== 'number' || concurrency.value !== '4') {
      errors.push('config 동시 agent 제한 불일치: expected 4');
    }
  } else {
    errors.push('config 동시 agent 제한 불일치: expected 4');
  }

  for (const role of AGENT_ROLES) {
    const tableName = `agents.${role}`;
    const roleTable = parsed.tables.get(tableName);
    if (roleTable === undefined) {
      continue;
    }
    for (const key of roleTable.keys()) {
      if (!['description', 'config_file'].includes(key)) {
        errors.push(`config TOML 허용되지 않은 key: ${tableName}:${key}`);
      }
    }
    const configFile = roleTable.get('config_file');
    if (configFile?.type !== 'string' || configFile.value !== `agents/${role}.toml`) {
      errors.push(`agent config_file 연결 불일치: ${role}`);
    }
  }
}

function createAgentFixture(role) {
  return `name = "${role}"
description = "fixture"
sandbox_mode = "${AGENT_SANDBOX_MODES[role]}"
developer_instructions = """
${AGENT_RESPONSIBILITIES[role]}
${APPROVAL_CONTRACT}
${DELEGATION_CONTRACT}
${HANDOFF_CONTRACT}
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

    for (const contract of SKILL_CONTRACTS) {
      if (!skill.includes(contract)) {
        errors.push(`skill 계약 누락: ${contract}`);
      }
    }
  }

  const references = REFERENCE_FILES.map(file => contents.get(file))
    .filter(content => content !== null)
    .join('\n');
  if (references !== '') {
    for (const contract of SKILL_CONTRACTS) {
      if (!references.includes(contract)) {
        errors.push(`reference 계약 누락: ${contract}`);
      }
    }
  }

  for (const agentFile of AGENT_FILES) {
    const agent = contents.get(agentFile);
    const role = path.basename(agentFile, '.toml');

    if (agent === null) {
      continue;
    }

    validateAgentToml(agent, role, errors);

    for (const field of ['sandbox_mode', 'developer_instructions', '상태', '근거', '검증']) {
      if (!agent.includes(field)) {
        errors.push(`agent 계약 누락 (${path.basename(agentFile)}): ${field}`);
      }
    }

    if (!hasTomlStringValue(agent, 'name', role)) {
      errors.push(`agent name 불일치: ${role}`);
    }

    if (!hasTomlStringValue(agent, 'sandbox_mode', AGENT_SANDBOX_MODES[role])) {
      errors.push(`agent sandbox_mode 불일치: ${role} (expected ${AGENT_SANDBOX_MODES[role]})`);
    }

    for (const field of FORBIDDEN_MODEL_SETTINGS.slice(0, 2)) {
      if (hasTomlField(agent, field)) {
        errors.push(`agent ${field} 설정 금지: ${role}`);
      }
    }

    if (!hasHandoffContract(agent)) {
      errors.push(`agent handoff 계약 불일치: ${role}`);
    }

    if (!agent.includes(AGENT_RESPONSIBILITIES[role])) {
      errors.push(`agent 역할 책임 계약 누락: ${role}`);
    }

    if (!agent.includes(APPROVAL_CONTRACT)) {
      errors.push(`agent 승인 경계 계약 누락: ${role}`);
    }

    if (!agent.includes(DELEGATION_CONTRACT)) {
      errors.push(`agent 하위 위임 금지 계약 누락: ${role}`);
    }
  }

  const config = contents.get('.codex/config.toml');
  if (config !== null) {
    validateConfigToml(config, errors);

    for (const field of FORBIDDEN_MODEL_SETTINGS) {
      if (hasTomlField(config, field)) {
        errors.push(`config model 설정 금지: ${field}`);
      }
    }
  }

  const packageJson = readFile(rootDir, 'package.json', errors);
  if (packageJson !== null) {
    try {
      const scripts = JSON.parse(packageJson).scripts;
      const expectedScripts = {
        verify:
          'pnpm lint && pnpm format && pnpm test --runInBand && pnpm verify:harness && pnpm build',
        'verify:harness':
          'node scripts/verify-agent-harness.mjs && node scripts/verify-agent-harness.mjs --self-test',
      };

      for (const [name, value] of Object.entries(expectedScripts)) {
        if (scripts?.[name] !== value) {
          errors.push(`package.json script 불일치: ${name}`);
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
    const incompleteErrors = validateHarness(tempDir);
    assert.ok(incompleteErrors.some(error => error.includes('필수 파일 누락')));

    const skillContent = `---\nname: fixture\ndescription: fixture\n---\n${SKILL_CONTRACTS.join('\n')}`;
    writeFixtureFile(tempDir, 'AGENTS.md', '# fixture');
    writeFixtureFile(tempDir, SKILL_FILE, skillContent);
    for (const referenceFile of REFERENCE_FILES) {
      writeFixtureFile(tempDir, referenceFile, SKILL_CONTRACTS.join('\n'));
    }
    for (const agentFile of AGENT_FILES) {
      const role = path.basename(agentFile, '.toml');

      writeFixtureFile(tempDir, agentFile, createAgentFixture(role));
    }
    const configContent = `[agents]
max_concurrent_threads_per_session = 4

${AGENT_FILES.map(agentFile => {
  const role = path.basename(agentFile, '.toml');
  return `[agents.${role}]\ndescription = "fixture"\nconfig_file = "agents/${role}.toml"`;
}).join('\n\n')}`;
    writeFixtureFile(tempDir, '.codex/config.toml', configContent);
    writeFixtureFile(tempDir, '.github/workflows/quality.yml', 'name: fixture');
    writeFixtureFile(
      tempDir,
      'package.json',
      JSON.stringify({
        scripts: {
          verify:
            'pnpm lint && pnpm format && pnpm test --runInBand && pnpm verify:harness && pnpm build',
          'verify:harness':
            'node scripts/verify-agent-harness.mjs && node scripts/verify-agent-harness.mjs --self-test',
        },
      })
    );

    assert.deepEqual(validateHarness(tempDir), []);

    writeFixtureFile(tempDir, '.codex/agents/rogue.toml', createAgentFixture('product-planner'));
    const rogueAgentFileErrors = validateHarness(tempDir);
    assert.ok(
      rogueAgentFileErrors.some(error => error === 'agent 파일 집합 불일치: unexpected=rogue.toml')
    );
    rmSync(path.join(tempDir, '.codex/agents/rogue.toml'));

    rmSync(path.join(tempDir, '.codex/agents/product-designer.toml'));
    const missingAgentFileErrors = validateHarness(tempDir);
    assert.ok(
      missingAgentFileErrors.some(
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
      `${configContent}\n\n[agents.rogue]\nconfig_file = "agents/rogue.toml"`
    );
    const rogueConfigTableErrors = validateHarness(tempDir);
    assert.ok(
      rogueConfigTableErrors.some(
        error => error === 'config table 집합 불일치: unexpected=agents.rogue'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      `${configContent}\n\n[agents.product-planner]\nconfig_file = "agents/product-planner.toml"`
    );
    const duplicateConfigTableErrors = validateHarness(tempDir);
    assert.ok(
      duplicateConfigTableErrors.some(
        error => error === 'config TOML table 중복: agents.product-planner'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').slice(0, -3)
    );
    const malformedAgentErrors = validateHarness(tempDir);
    assert.ok(
      malformedAgentErrors.some(
        error => error === 'agent TOML developer_instructions 종료 누락: product-planner'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').replace(
        'sandbox_mode = "read-only"',
        'sandbox_mode = "read-only"\nsandbox_mode = "read-only"'
      )
    );
    const duplicateAgentKeyErrors = validateHarness(tempDir);
    assert.ok(
      duplicateAgentKeyErrors.some(
        error => error === 'agent TOML key 중복: product-planner:sandbox_mode'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').replace(
        'developer_instructions',
        'agents.default_subagent_model = "fixture"\ndeveloper_instructions'
      )
    );
    const dottedAgentModelErrors = validateHarness(tempDir);
    assert.ok(
      dottedAgentModelErrors.some(
        error =>
          error === 'agent TOML 허용되지 않은 key: product-planner:agents.default_subagent_model'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      `${configContent}\n\n[agents]\nagents.default_subagent_model = "fixture"`
    );
    const dottedConfigModelErrors = validateHarness(tempDir);
    assert.ok(
      dottedConfigModelErrors.some(
        error => error === 'config TOML 허용되지 않은 key: agents:agents.default_subagent_model'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      `${configContent}\n\n[agents.product-planner]\nmodel = "fixture"`
    );
    const roleModelErrors = validateHarness(tempDir);
    assert.ok(
      roleModelErrors.some(
        error => error === 'config TOML 허용되지 않은 key: agents.product-planner:model'
      )
    );

    writeFixtureFile(tempDir, '.codex/config.toml', configContent);
    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').replace(
        '문제, 대상 사용자, 사용자 가치, 범위, 제외 범위와 완료 조건',
        '역할 책임 누락'
      )
    );
    const responsibilityErrors = validateHarness(tempDir);
    assert.ok(
      responsibilityErrors.some(error => error === 'agent 역할 책임 계약 누락: product-planner')
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').replace(
        '사용자 승인이 필요한 범위가 발견되면 구현을 제안만 하고 변경하지 않는다.',
        '승인 경계 누락'
      )
    );
    const approvalErrors = validateHarness(tempDir);
    assert.ok(approvalErrors.some(error => error === 'agent 승인 경계 계약 누락: product-planner'));

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').replace(
        '하위 agent에 작업을 위임하지 않는다.',
        '하위 위임 금지 누락'
      )
    );
    const delegationErrors = validateHarness(tempDir);
    assert.ok(
      delegationErrors.some(error => error === 'agent 하위 위임 금지 계약 누락: product-planner')
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace('max_concurrent_threads_per_session = 4', 'max_threads = 4')
    );
    const concurrencyErrors = validateHarness(tempDir);
    assert.ok(
      concurrencyErrors.some(error => error === 'config 동시 agent 제한 불일치: expected 4')
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').replace(
        'sandbox_mode = "read-only"',
        'sandbox_mode = "workspace-write"'
      )
    );
    const sandboxErrors = validateHarness(tempDir);
    assert.ok(
      sandboxErrors.some(
        error => error === 'agent sandbox_mode 불일치: product-planner (expected read-only)'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').replace(
        'developer_instructions',
        'model = "fixture"\ndeveloper_instructions'
      )
    );
    const modelErrors = validateHarness(tempDir);
    assert.ok(modelErrors.some(error => error === 'agent model 설정 금지: product-planner'));

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').replace(
        'developer_instructions',
        'model_reasoning_effort = "medium"\ndeveloper_instructions'
      )
    );
    const reasoningErrors = validateHarness(tempDir);
    assert.ok(
      reasoningErrors.some(
        error => error === 'agent model_reasoning_effort 설정 금지: product-planner'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').replace(HANDOFF_CONTRACT, '상태 근거 검증')
    );
    const handoffErrors = validateHarness(tempDir);
    assert.ok(handoffErrors.some(error => error === 'agent handoff 계약 불일치: product-planner'));

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      `${configContent}\n\ndefault_subagent_model = "fixture"`
    );
    const configModelErrors = validateHarness(tempDir);
    assert.ok(
      configModelErrors.some(error => error === 'config model 설정 금지: default_subagent_model')
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      `${configContent}\n\ndefault_subagent_reasoning_effort = "medium"`
    );
    const configReasoningErrors = validateHarness(tempDir);
    assert.ok(
      configReasoningErrors.some(
        error => error === 'config model 설정 금지: default_subagent_reasoning_effort'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace(
        'config_file = "agents/product-planner.toml"',
        'config_file = "agents/product-designer.toml"'
      )
    );
    const configErrors = validateHarness(tempDir);
    assert.ok(
      configErrors.some(error => error === 'agent config_file 연결 불일치: product-planner')
    );

    writeFixtureFile(tempDir, '.codex/config.toml', configContent);
    writeFixtureFile(tempDir, SKILL_FILE, skillContent.replace('high-risk', 'removed-contract'));
    const contractErrors = validateHarness(tempDir);
    assert.ok(contractErrors.some(error => error === 'skill 계약 누락: high-risk'));
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
