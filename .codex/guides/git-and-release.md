# GitHub과 릴리즈 가이드

## 브랜치와 커밋

- 작업 브랜치는 최신 `develop`에서 만들고 다음 형식을 사용한다.
  - `feat/<description>`
  - `fix/<description>`
  - `refactor/<description>`
  - `chore/<description>`
  - `docs/<description>`

- 브랜치명에 이슈 번호를 강제하지 않는다.
- `main`에서 직접 작업하지 않는다.
- Git worktree 생성, force push, `--no-verify`를 사용한 hook 우회를 금지한다.
- 커밋 메시지는 한글로 간결하게 작성하며 `feat:`, `fix:`, `chore:`, `refactor:`, `docs:` 접두사를 사용한다.
- 커밋 전에는 `git status`, `git diff`, 관련 검증 결과를 확인한다.

## PR과 직접 푸시

- 코드 또는 설정 변경은 `develop` 대상 PR이 기본이다.
- 코드·설정 변경이 없는 문서 또는 단순 텍스트 변경만 직접 푸시를 제안할 수 있다.
- 직접 푸시도 대상 브랜치와 변경 요약을 먼저 제시하고 승인받은 뒤 실행한다.
- PR 전에는 제목, 본문, 대상 브랜치, Assignee `myungjuice`, 의미 있는 라벨을 초안으로 제시한다.
- PR 본문을 작성하기 전에는 반드시 대상 브랜치의 `.github/PULL_REQUEST_TEMPLATE.md`를 직접 읽는다. 템플릿이 있으면 제목·섹션·체크박스·안내 구조를 그대로 사용하고, 실제 작업 내용만 채운다. CLI로 PR을 생성할 때도 임의의 축약 본문으로 템플릿을 대체하지 않는다.
- 사용자 승인 전에는 브랜치를 push하지 않는다.
- 승인된 PR은 Draft로 생성한다. 사용자 검토와 별도 승인 전에는 Ready 상태로 바꾸지 않는다.
- auto-merge를 설정하지 않으며, 병합은 검토 완료 뒤 별도 승인을 받아 실행한다.

## 병합 후 정리

병합을 확인한 뒤 origin과 local의 작업 브랜치를 정리하고, local `develop`을 origin의 최신
상태로 갱신한다. 삭제 대상 브랜치와 병합 상태를 먼저 확인하며 `main`이나 `develop`을
삭제하지 않는다.

## 라벨

작업 성격에 따라 다음 기존 라벨을 선택한다.

| 작업      | 라벨                      |
| --------- | ------------------------- |
| 기능 추가 | `enhancement`             |
| 버그 수정 | `bug`                     |
| 문서      | `documentation`           |
| UI·스타일 | `style`                   |
| 구조 개선 | `refactor`                |
| 릴리즈    | `release`                 |
| 버전 범위 | `major`, `minor`, `patch` |

## CodeRabbit

PR 생성 후 CodeRabbit 리뷰 polling을 등록할지 권장안과 함께 사용자에게 질문한다. 승인한
경우에만 백그라운드에서 실행하며, 리뷰 대응 절차는 `.codex/guides/review.md`를 따른다.

## 릴리즈

1. `develop`에서 `main`으로의 릴리즈 PR을 준비한다.
2. major/minor/patch 권장안과 근거를 제시한다.
3. 릴리즈 노트 초안을 제시한다.
4. 사용자 승인 후 Draft 릴리즈 PR을 생성한다.
5. 병합 승인 후에만 `main` 병합을 수행한다.
6. 태그 이름과 GitHub Release 내용을 다시 제시해 승인받는다.
7. 승인 후 태그와 GitHub Release를 생성한다.
