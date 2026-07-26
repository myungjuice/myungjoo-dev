import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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

function hasExpectedAgentConfigFile(config, role) {
  const sectionHeader = new RegExp(`^\\[agents\\.${role}\\]\\s*$`, 'm');
  const agentSection = config.split(/(?=^\[)/m).find(section => sectionHeader.test(section));
  const expectedConfigFile = new RegExp(`^config_file\\s*=\\s*"agents/${role}\\.toml"\\s*$`, 'm');

  return agentSection !== undefined && expectedConfigFile.test(agentSection);
}

export function validateHarness(rootDir) {
  const errors = [];
  const contents = new Map();

  for (const requiredFile of REQUIRED_FILES) {
    contents.set(requiredFile, readFile(rootDir, requiredFile, errors));
  }

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

    if (agent === null) {
      continue;
    }

    for (const field of ['sandbox_mode', 'developer_instructions', '상태', '근거', '검증']) {
      if (!agent.includes(field)) {
        errors.push(`agent 계약 누락 (${path.basename(agentFile)}): ${field}`);
      }
    }
  }

  const config = contents.get('.codex/config.toml');
  if (config !== null) {
    for (const agentFile of AGENT_FILES) {
      const role = path.basename(agentFile, '.toml');

      if (!hasExpectedAgentConfigFile(config, role)) {
        errors.push(`agent config_file 연결 불일치: ${role}`);
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
      writeFixtureFile(
        tempDir,
        agentFile,
        'sandbox_mode = "workspace-write"\ndeveloper_instructions = "상태 근거 검증"'
      );
    }
    const configContent = `${AGENT_FILES.map(agentFile => {
      const role = path.basename(agentFile, '.toml');
      return `[agents.${role}]\nconfig_file = "agents/${role}.toml"`;
    }).join('\n\n')}\n\n# ${AGENT_FILES.join(' ')}`;
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
