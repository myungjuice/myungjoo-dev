# gstack 하네스 제거 설계

- **이슈**: [#47 [chore] 프로젝트 내 gstack 하네스 제거](https://github.com/myungjuice/myungjoo-dev/issues/47)
- **날짜**: 2026-07-05
- **상태**: 승인됨

## 목적

#35에서 클로드코드 하네스 엔지니어링 세팅의 일환으로 도입한 gstack을 프로젝트와 로컬 환경에서 완전히 제거한다. 실제 워크플로우에서 활용도가 낮고, vendored 본체가 363MB(6,943개 파일)에 달해 로컬 환경에 부담이며, 스킬들이 gstack 바이너리에 강하게 결합돼 있어 유지할 이유가 없다.

## 범위

### 제거 대상 — git 추적 (커밋 필요)

| 대상 | 상세 | 방식 |
| --- | --- | --- |
| `.claude/skills/` 스킬 8종 | careful, checkpoint, investigate, office-hours, plan-eng-review, qa, review, ship — 각 SKILL.md가 gstack 바이너리를 81~119회 호출하는 gstack 전용 스킬 | `git rm` |
| `.claude/commands/` 커맨드 8개 | 위 스킬을 가리키는 한 줄짜리 래퍼 | `git rm` |
| `CLAUDE.md` | "## 스킬 라우팅" 섹션 통째 삭제 (8개 스킬 라우팅 테이블) | 편집 |
| `.gitignore` | `# gstack vendored skills` 주석 및 `.claude/skills/gstack/` 항목 삭제 | 편집 |

### 제거 대상 — 로컬 전용 (커밋 없음)

| 대상 | 상세 |
| --- | --- |
| `.claude/skills/gstack/` | vendored 본체 363MB — 이미 gitignore돼 있어 git 추적 안 됨 |
| `.claude/settings.local.json` | `Skill(office-hours)` 허용 항목 제거 |
| `~/.claude/skills/gstack/` | 홈 디렉토리 gstack 실행 본체 |
| `~/.gstack/` | gstack 설정·세션·분석 데이터 |

### 유지 대상

- `.claude/rules/` 4종 (code.md, commit.md, issue.md, pr.md) — gstack 참조 없음
- `.coderabbit.yaml` — 무관
- CLAUDE.md의 스킬 라우팅 외 나머지 전체

## 작업 순서

브랜치 `feature/remove-gstack` (develop 기반), 논리 단위 커밋:

1. `docs: gstack 제거 설계 문서 추가 (#47)` — 본 스펙 문서 (+ 이후 계획 문서)
2. `chore: gstack 스킬/커맨드 제거 (#47)` — `.claude/skills/` 8종 + `.claude/commands/` 8개
3. `docs: CLAUDE.md 스킬 라우팅 섹션 삭제 및 .gitignore 정리 (#47)`

로컬/홈 디렉토리 정리는 git 밖 작업이므로 PR 검증 후 마지막에 수행한다.

## 검증

- `grep -ri gstack` 결과 레포 내 잔재 0건 (node_modules, 스펙/계획 문서 제외)
- `pnpm test` 전체 통과 (앱 코드는 건드리지 않지만 안전망)
- 제거 후 Claude Code 세션이 `.claude/rules`만으로 정상 동작하는 구조 확인

## 결정 사항

- **제거 범위**: 프로젝트 + 홈 디렉토리 전부 (사용자 승인)
- **CLAUDE.md 라우팅**: 재편 없이 통째 삭제 — superpowers는 사용자 머신 레벨 플러그인이라 프로젝트에 직접 언급하지 않는다 (사용자 결정)
- **접근 방식**: A안 원샷 제거 — gstack은 재설치 가능한 도구라 홈 삭제도 복구 가능하므로 단계를 나눌 이유가 없다

## 리스크

- 홈 gstack 삭제는 다른 프로젝트 세션에도 영향을 준다 → 사용자 승인 완료, 필요 시 gstack 재설치로 복구 가능
- `/ship`, `/review` 등 워크플로우 공백 → superpowers 플러그인과 Claude Code 내장 스킬(code-review 등)로 대체
