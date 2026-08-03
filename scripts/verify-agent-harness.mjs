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
const AGENT_ROLES = AGENT_FILES.map(agentFile => path.basename(agentFile, '.toml'));
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
    const record = { type, value: type === 'triple' ? '' : match[2] };
    current.set(key, record);

    if (type === 'triple') {
      openDeveloperInstructions = { key, lines: [], record, table: currentTable };
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

  for (const agentFile of AGENT_FILES) {
    const agent = contents.get(agentFile);
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
      for (const name of ['verify', 'verify:harness']) {
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

/* 이전의 값 고정 self-test는 구조 중심 검증으로 교체했다.
function runSelfTest() {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), 'verify-agent-harness-'));

  try {
    const incompleteErrors = validateHarness(tempDir);
    assert.ok(incompleteErrors.some(error => error.includes('필수 파일 누락')));

    const skillContent = `---\nname: fixture\ndescription: fixture\n---\n${SKILL_CONTRACTS.join('\n')}
${POSITIVE_PROSE_CONTRACTS[0].text}
${POSITIVE_PROSE_CONTRACTS[1].text}`;
    const routingContent = `${SKILL_CONTRACTS.join('\n')}
${POSITIVE_PROSE_CONTRACTS[2].text}
${POSITIVE_PROSE_CONTRACTS[3].text}`;
    const qualityGateContent = `${SKILL_CONTRACTS.join('\n')}
${POSITIVE_PROSE_CONTRACTS[4].text}

${createNormativeContractTable()}`;
    writeFixtureFile(tempDir, 'AGENTS.md', '# fixture');
    writeFixtureFile(tempDir, SKILL_FILE, skillContent);
    writeFixtureFile(tempDir, REFERENCE_FILES[0], routingContent);
    writeFixtureFile(tempDir, REFERENCE_FILES[1], qualityGateContent);
    writeFixtureFile(tempDir, REFERENCE_FILES[2], SKILL_CONTRACTS.join('\n'));
    for (const agentFile of AGENT_FILES) {
      const role = path.basename(agentFile, '.toml');

      writeFixtureFile(tempDir, agentFile, createAgentFixture(role));
    }
    const configContent = `model = "gpt-5.6-sol"
model_reasoning_effort = "medium"

[agents]
default_subagent_model = "gpt-5.6-terra"
default_subagent_reasoning_effort = "medium"
max_concurrent_threads_per_session = 3

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

    writeFixtureFile(tempDir, '.codex/agents/additional-agent.toml', createAgentFixture('product-planner'));
    assert.deepEqual(validateHarness(tempDir), []);
    rmSync(path.join(tempDir, '.codex/agents/additional-agent.toml'));

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
      skillContent.replace('기본으로 하고 필요할 때만', '원칙으로 하고 필요한 경우에만')
    );
    assert.deepEqual(validateHarness(tempDir), []);
    writeFixtureFile(tempDir, SKILL_FILE, skillContent);

    writeFixtureFile(
      tempDir,
      'package.json',
      JSON.stringify({
        scripts: {
          verify: 'pnpm lint && pnpm test',
          'verify:harness': 'node scripts/verify-agent-harness.mjs --self-test',
        },
      })
    );
    assert.deepEqual(validateHarness(tempDir), []);
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

    const negativeProseCases = [
      {
        file: SKILL_FILE,
        content: skillContent,
        from: '기본으로 하고 필요할 때만',
        to: '기본으로 하지 않고 필요할 때만',
        label: 'lightweight CTO 직접 수행',
      },
      {
        file: SKILL_FILE,
        content: skillContent,
        from: '새 Codex 대화에서 시작하는 것을 기본으로 한다.',
        to: '새 Codex 대화에서 시작하지 않는 것을 기본으로 한다.',
        label: '새 구현 대화',
      },
      {
        file: REFERENCE_FILES[0],
        content: routingContent,
        from: '독립 code-reviewer를 기본으로 사용한다.',
        to: '독립 code-reviewer를 기본으로 사용하지 않는다.',
        label: 'standard 기본 역할',
      },
      {
        file: REFERENCE_FILES[0],
        content: routingContent,
        from: '위험 조건에 맞는 전문 역할과 복구 근거를 추가한다.',
        to: '위험 조건에 맞는 전문 역할과 복구 근거를 추가하지 않는다.',
        label: 'high-risk 전담 QA와 전문 역할',
      },
      {
        file: REFERENCE_FILES[1],
        content: qualityGateContent,
        from: '기록된 경우에만 재사용한다.',
        to: '기록된 경우에도 재사용하지 않는다.',
        label: '동일 HEAD 검증 재사용',
      },
    ];

    for (const testCase of negativeProseCases) {
      const decoy =
        testCase.label === 'lightweight CTO 직접 수행'
          ? `\n<!-- ${POSITIVE_PROSE_CONTRACTS[0].text} -->\n\`\`\`md\n${POSITIVE_PROSE_CONTRACTS[0].text}\n\`\`\``
          : '';
      writeFixtureFile(
        tempDir,
        testCase.file,
        `${testCase.content.replace(testCase.from, testCase.to)}${decoy}`
      );
      assert.ok(
        validateHarness(tempDir).some(
          error => error === `긍정형 prose 계약 불일치: ${testCase.label}`
        )
      );
      writeFixtureFile(tempDir, testCase.file, testCase.content);
    }

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace('model = "gpt-5.6-sol"', 'model = "wrong-model"')
    );
    assert.ok(
      validateHarness(tempDir).some(
        error => error === 'config CTO model 불일치: expected gpt-5.6-sol'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace('model_reasoning_effort = "medium"', 'model_reasoning_effort = "high"')
    );
    assert.ok(
      validateHarness(tempDir).some(
        error => error === 'config CTO reasoning effort 불일치: expected medium'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace(
        'default_subagent_model = "gpt-5.6-terra"',
        'default_subagent_model = "wrong-model"'
      )
    );
    assert.ok(
      validateHarness(tempDir).some(
        error => error === 'config 기본 sub-agent model 불일치: expected gpt-5.6-terra'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace(
        'default_subagent_reasoning_effort = "medium"',
        'default_subagent_reasoning_effort = "high"'
      )
    );
    assert.ok(
      validateHarness(tempDir).some(
        error => error === 'config 기본 sub-agent reasoning effort 불일치: expected medium'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/config.toml',
      configContent.replace(
        'max_concurrent_threads_per_session = 3',
        'max_concurrent_threads_per_session = 9'
      )
    );
    assert.ok(
      validateHarness(tempDir).some(error => error === 'config 동시 agent 제한 불일치: expected 3')
    );

    writeFixtureFile(tempDir, '.codex/config.toml', configContent);
    writeFixtureFile(
      tempDir,
      '.codex/agents/code-reviewer.toml',
      createAgentFixture('code-reviewer').replace(
        CODE_REVIEWER_QA_CONTRACT,
        '코드 검토와 함께 승인된 완료 조건을 기준으로 QA 증거의 충분성과 공백을 확인하지 않는다.'
      )
    );
    assert.ok(
      validateHarness(tempDir).some(
        error => error === 'agent 완료 조건 기반 QA 증거 계약 누락: code-reviewer'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/code-reviewer.toml',
      createAgentFixture('code-reviewer')
    );

    for (const [key, value] of NORMATIVE_CONTRACTS) {
      const mutatedTable = createNormativeContractTable(new Map([[key, `${value}-invalid`]]));
      writeFixtureFile(
        tempDir,
        REFERENCE_FILES[1],
        qualityGateContent.replace(createNormativeContractTable(), mutatedTable)
      );
      assert.ok(
        validateHarness(tempDir).some(
          error => error === `기계 판독 계약 값 불일치: ${key} (expected ${value})`
        )
      );
    }
    writeFixtureFile(tempDir, REFERENCE_FILES[1], qualityGateContent);

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner')
        .replace(`${AGENT_RESPONSIBILITIES['product-planner']}\n`, '')
        .replace(
          'developer_instructions = """',
          `# ${AGENT_RESPONSIBILITIES['product-planner']}\ndeveloper_instructions = """`
        )
    );
    const commentedResponsibilityErrors = validateHarness(tempDir);
    assert.ok(
      commentedResponsibilityErrors.some(
        error => error === 'agent 역할 책임 계약 누락: product-planner'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner')
        .replace(`${APPROVAL_CONTRACT}\n`, '')
        .replace(
          'developer_instructions = """',
          `# ${APPROVAL_CONTRACT}\ndeveloper_instructions = """`
        )
    );
    const commentedApprovalErrors = validateHarness(tempDir);
    assert.ok(
      commentedApprovalErrors.some(error => error === 'agent 승인 경계 계약 누락: product-planner')
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner')
        .replace(`${DELEGATION_CONTRACT}\n`, '')
        .replace(
          'developer_instructions = """',
          `# ${DELEGATION_CONTRACT}\ndeveloper_instructions = """`
        )
    );
    const commentedDelegationErrors = validateHarness(tempDir);
    assert.ok(
      commentedDelegationErrors.some(
        error => error === 'agent 하위 위임 금지 계약 누락: product-planner'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner')
        .replace(`${HANDOFF_CONTRACT}\n`, '')
        .replace(
          'developer_instructions = """',
          `${HANDOFF_CONTRACT.split('\n')
            .map(line => `# ${line}`)
            .join('\n')}\ndeveloper_instructions = """`
        )
    );
    const commentedHandoffErrors = validateHarness(tempDir);
    assert.ok(
      commentedHandoffErrors.some(error => error === 'agent handoff 계약 불일치: product-planner')
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner')
        .replace('name = "product-planner"\n', '')
        .replace(
          'developer_instructions = """',
          'developer_instructions = """\nname = "product-planner"'
        )
    );
    const nameInInstructionsErrors = validateHarness(tempDir);
    assert.ok(
      nameInInstructionsErrors.some(error => error === 'agent 필수 key 누락: product-planner:name')
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner')
        .replace('sandbox_mode = "read-only"\n', '')
        .replace(
          'developer_instructions = """',
          'developer_instructions = """\nsandbox_mode = "read-only"'
        )
    );
    const sandboxInInstructionsErrors = validateHarness(tempDir);
    assert.ok(
      sandboxInInstructionsErrors.some(
        error => error === 'agent 필수 key 누락: product-planner:sandbox_mode'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner').replace('description = "fixture"', 'description = 4')
    );
    const descriptionTypeErrors = validateHarness(tempDir);
    assert.ok(
      descriptionTypeErrors.some(
        error => error === 'agent 필수 key 타입 불일치: product-planner:description'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner')
        .replace('developer_instructions = """', '# developer_instructions = """')
        .replace(`${AGENT_RESPONSIBILITIES['product-planner']}\n`, '')
    );
    const commentedInstructionsErrors = validateHarness(tempDir);
    assert.ok(
      commentedInstructionsErrors.some(
        error => error === 'agent 필수 key 누락: product-planner:developer_instructions'
      )
    );

    writeFixtureFile(
      tempDir,
      '.codex/agents/product-planner.toml',
      createAgentFixture('product-planner')
    );

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
      configContent.replace('max_concurrent_threads_per_session = 3', 'max_threads = 9')
    );
    const concurrencyErrors = validateHarness(tempDir);
    assert.ok(
      concurrencyErrors.some(error => error === 'config 동시 agent 제한 불일치: expected 3')
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
*/

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
      JSON.stringify({ scripts: { verify: 'pnpm verify', 'verify:harness': 'node verify.mjs' } })
    );

    assert.deepEqual(validateHarness(tempDir), []);

    writeFixtureFile(
      tempDir,
      '.codex/agents/additional-agent.toml',
      createAgentFixture('additional-agent')
    );
    assert.deepEqual(validateHarness(tempDir), []);
    rmSync(path.join(tempDir, '.codex/agents/additional-agent.toml'));

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
