# gstack 하네스 제거 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 프로젝트와 로컬 환경에서 gstack 하네스(스킬 8종, 커맨드 래퍼 8개, vendored 본체, 홈 디렉토리 설치본)를 완전히 제거한다.

**Architecture:** 순수 삭제 작업. git 추적 파일(스킬/커맨드/CLAUDE.md/.gitignore)은 논리 단위 커밋으로 제거하고, git 밖 자산(프로젝트 로컬 363MB 본체, 홈 디렉토리 설치본)은 검증 후 마지막에 삭제한다. 앱 코드는 일절 건드리지 않는다.

**Tech Stack:** git, zsh. 스펙: `docs/superpowers/specs/2026-07-05-remove-gstack-design.md` (이슈 #47)

## Global Constraints

- 커밋 메시지는 한글, `타입: 설명 (#47)` 형식 (`.claude/rules/commit.md`)
- `.claude/rules/` 4종(code, commit, issue, pr)과 `.coderabbit.yaml`은 절대 건드리지 않는다
- 브랜치: `feature/remove-gstack` (develop 기반, 이미 생성됨)
- 푸시/PR 생성은 사용자 승인 후에만 (`.claude/rules/pr.md`)
- 홈 디렉토리 삭제(Task 5)는 프로젝트 밖 파괴적 작업 — 반드시 Task 3 검증 통과 후 실행

---

### Task 1: gstack 스킬/커맨드 git 제거

**Files:**
- Delete: `.claude/skills/careful/SKILL.md`, `.claude/skills/checkpoint/SKILL.md`, `.claude/skills/investigate/SKILL.md`, `.claude/skills/office-hours/SKILL.md`, `.claude/skills/plan-eng-review/SKILL.md`, `.claude/skills/qa/SKILL.md`, `.claude/skills/review/SKILL.md`, `.claude/skills/ship/SKILL.md`
- Delete: `.claude/commands/careful.md`, `.claude/commands/checkpoint.md`, `.claude/commands/investigate.md`, `.claude/commands/office-hours.md`, `.claude/commands/plan-eng-review.md`, `.claude/commands/qa.md`, `.claude/commands/review.md`, `.claude/commands/ship.md`

**Interfaces:**
- Consumes: 없음
- Produces: `.claude/` 아래 git 추적 파일은 `rules/` 4종만 남는다 (Task 3 검증이 이 상태를 전제)

- [ ] **Step 1: 스킬 8종 + 커맨드 8개 git rm**

```bash
git rm -r .claude/skills/careful .claude/skills/checkpoint .claude/skills/investigate .claude/skills/office-hours .claude/skills/plan-eng-review .claude/skills/qa .claude/skills/review .claude/skills/ship
git rm .claude/commands/careful.md .claude/commands/checkpoint.md .claude/commands/investigate.md .claude/commands/office-hours.md .claude/commands/plan-eng-review.md .claude/commands/qa.md .claude/commands/review.md .claude/commands/ship.md
```

주의: `.claude/skills/gstack/`(vendored 본체)은 git 추적이 아니므로 `git rm` 대상이 아니다. Task 4에서 처리한다.

- [ ] **Step 2: 삭제 결과 확인**

Run: `git status --short | head -20 && git ls-files .claude`
Expected: `D` 16건 (skills 8 + commands 8), `git ls-files .claude` 출력은 `.claude/rules/` 4개 파일만

- [ ] **Step 3: 커밋**

```bash
git commit -m "chore: gstack 스킬/커맨드 제거 (#47)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: CLAUDE.md 스킬 라우팅 섹션 삭제 및 .gitignore 정리

**Files:**
- Modify: `CLAUDE.md:133-150` (파일 끝의 "## 스킬 라우팅" 섹션과 직전 `---` 구분선)
- Modify: `.gitignore:50-51` (gstack 항목)

**Interfaces:**
- Consumes: 없음
- Produces: CLAUDE.md는 "건드리면 안 되는 파일" 섹션으로 끝난다. `.gitignore`에서 `gstack` 문자열이 사라진다 (Task 3 grep 검증의 전제)

- [ ] **Step 1: CLAUDE.md에서 스킬 라우팅 섹션 삭제**

CLAUDE.md 끝부분의 아래 블록 전체를 삭제한다 (`---` 구분선 포함, "## 스킬 라우팅" 제목부터 라우팅 테이블 마지막 행 `| "여기까지 저장해줘"... | \`/checkpoint\` |`까지). 파일은 다음으로 끝나야 한다:

```markdown
- `pnpm-lock.yaml` — 수동 편집 금지, pnpm이 자동 관리
- `next-env.d.ts` — Next.js 자동 생성 파일
- `tsconfig.tsbuildinfo` — TypeScript 증분 컴파일 캐시, 자동 생성
```

- [ ] **Step 2: .gitignore에서 gstack 항목 삭제**

아래 두 줄(및 남는 중복 빈 줄 1개)을 삭제한다:

```
# gstack vendored skills (too large, managed per-developer)
.claude/skills/gstack/
```

`.claude/settings.local.json` ignore 항목은 유지한다 (gstack과 무관한 로컬 설정 파일).

- [ ] **Step 3: 결과 확인**

Run: `grep -c "스킬 라우팅" CLAUDE.md; grep -c gstack .gitignore`
Expected: 두 명령 모두 `0` (grep은 매치 0건이면 exit 1 — 정상)

- [ ] **Step 4: 커밋**

```bash
git add CLAUDE.md .gitignore
git commit -m "docs: CLAUDE.md 스킬 라우팅 섹션 삭제 및 .gitignore 정리 (#47)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: 레포 잔재 검증

**Files:**
- 없음 (읽기 전용 검증)

**Interfaces:**
- Consumes: Task 1~2의 삭제 결과
- Produces: 검증 통과 상태 — Task 4~5(파괴적 로컬/홈 삭제)의 실행 전제 조건

- [ ] **Step 1: git 추적 파일에서 gstack 잔재 0건 확인**

Run: `git grep -li gstack -- ':!docs/superpowers'`
Expected: 출력 없음 (exit 1). 스펙/계획 문서(`docs/superpowers/`)는 작업 기록이므로 제외.

- [ ] **Step 2: 전체 테스트 통과 확인**

Run: `pnpm test 2>&1 | tail -4`
Expected: `Test Suites: 14 passed, 14 total` / `Tests: 46 passed, 46 total`

- [ ] **Step 3: 실패 시 처리**

grep에서 잔재가 나오면 해당 파일을 확인해 Task 1~2 누락분을 수정 후 재검증한다. 테스트 실패 시 이 작업과 무관한지 확인하고(앱 코드는 건드리지 않았으므로 실패하면 안 됨) 원인 파악 전까지 Task 4로 진행하지 않는다.

---

### Task 4: 프로젝트 로컬 정리 (커밋 없음)

**Files:**
- Delete (로컬): `.claude/skills/gstack/` (363MB, git 미추적)
- Modify (로컬): `.claude/settings.local.json` — `Skill(office-hours)` 허용 항목 2개 제거

**Interfaces:**
- Consumes: Task 3 검증 통과
- Produces: 프로젝트 디렉토리에서 gstack 완전 소멸

- [ ] **Step 1: vendored 본체 삭제**

```bash
rm -rf .claude/skills/gstack
```

- [ ] **Step 2: settings.local.json 정리**

파일 내용을 아래로 교체한다 (기존 내용은 office-hours 스킬 허용 2건뿐):

```json
{
  "permissions": {
    "allow": []
  }
}
```

- [ ] **Step 3: 결과 확인**

Run: `ls .claude/skills/ 2>/dev/null; git status --short`
Expected: `ls`는 "No such file or directory" 또는 빈 출력(skills 폴더 자체가 사라짐), `git status`는 clean (로컬 삭제분은 git 미추적이라 변화 없음)

---

### Task 5: 홈 디렉토리 정리 (커밋 없음, 파괴적)

**Files:**
- Delete (홈): `~/.claude/skills/gstack/`
- Delete (홈): `~/.gstack/`

**Interfaces:**
- Consumes: Task 3 검증 통과 (사용자 승인은 브레인스토밍에서 완료)
- Produces: 머신 전체에서 gstack 소멸. 다른 프로젝트 세션에도 gstack 스킬이 더 이상 노출되지 않음

- [ ] **Step 1: 삭제 전 대상 확인**

Run: `du -sh ~/.claude/skills/gstack ~/.gstack 2>/dev/null`
Expected: 두 디렉토리의 크기 출력 (존재 확인)

- [ ] **Step 2: 삭제**

```bash
rm -rf ~/.claude/skills/gstack ~/.gstack
```

- [ ] **Step 3: 결과 확인**

Run: `ls ~/.claude/skills/gstack ~/.gstack 2>&1`
Expected: 두 경로 모두 "No such file or directory"

---

### Task 6: 푸시 및 PR 생성 (사용자 승인 게이트)

**Files:**
- 없음 (git 원격 작업)

**Interfaces:**
- Consumes: Task 1~5 완료 상태
- Produces: `develop` 대상 PR (Closes #47)

- [ ] **Step 1: PR 내용 작성 및 사용자 승인 요청**

`.github/PULL_REQUEST_TEMPLATE.md` 양식으로 PR 본문을 작성해 사용자에게 보여주고 승인을 받는다. 필수 요소: Overview(제거 내역 요약), What's Included(Others — 하네스 정리), Related Issues(`Closes #47`), Additional Notes(로컬/홈 정리는 커밋 밖 수행 명시). **승인 전 푸시 금지.**

- [ ] **Step 2: 승인 후 푸시**

```bash
git push -u origin feature/remove-gstack
```

- [ ] **Step 3: PR 생성**

```bash
gh pr create --base develop --title "chore: gstack 하네스 제거" --assignee myungjuice --body "<승인받은 본문>"
```

Expected: PR URL 출력. 라벨은 해당 항목이 없어 생략(refactor/enhancement 중 선택 여지 있으면 사용자에게 확인).

- [ ] **Step 4: CodeRabbit 리뷰 확인**

Run: `gh pr view <번호> --json reviews --jq '.reviews[].author.login'`
Expected: `coderabbitai` 리뷰 존재 (PR #46이 develop에 머지된 이후라면). 리뷰 코멘트가 있으면 사용자에게 보고한다.
