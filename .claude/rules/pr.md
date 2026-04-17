# 브랜치 & PR 규칙

## 브랜치 네이밍

- `feature/module-name`
- `fix/issue-description`

## PR 규칙

- PR target(base) 브랜치는 반드시 **develop**
- PR 작성 시 **github MCP server** 사용, 작성 전 내용 먼저 보여주고 승인 받기
- PR 양식은 `.github/PULL_REQUEST_TEMPLATE.md` 준수
- Assignees는 항상 **myungjuice**로 지정
- Labels는 작업 내용에 맞게 아래 기준으로 지정

## 라벨 기준

| 라벨            | 사용 시점                        |
| --------------- | -------------------------------- |
| `enhancement`   | 새 기능 추가                     |
| `bug`           | 버그 수정                        |
| `documentation` | 문서 작성/수정 (CLAUDE.md 등)    |
| `style`         | UI/스타일 변경                   |
| `refactor`      | 코드 리팩토링                    |
| `release`       | 릴리즈 작업                      |
