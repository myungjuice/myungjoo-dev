# 역할 handoff 계약

## 고정 출력 순서

모든 custom agent와 prompt fallback 역할은 다음 제목과 순서를 그대로 사용한다.

```markdown
1. 상태: DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED
2. 결론
3. 근거
4. 산출물
5. 검증
6. 미결정·위험
7. 다음 역할 입력
```

- `결론`은 권장안 또는 판정을 첫 문장에 둔다.
- `근거`는 읽은 파일, 요구사항, diff, 관찰을 구분한다.
- `산출물`은 변경 파일이나 보고서 경로를 적고 없으면 `없음`이라고 쓴다.
- `검증`은 실행 명령·관찰, 종료 코드·결과, 미실행 사유를 적는다.
- `미결정·위험`은 승인되지 않은 범위, 품질 gate 공백, 복구 한계를 적는다.
- `다음 역할 입력`은 다음 역할이 다시 조사하지 않도록 결정, 경로, 증거, 질문을 전달한다.

## 상태 의미

| 상태               | 사용 조건                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| DONE               | 역할 범위와 필수 검증이 끝났고 알려진 우려가 없다.                                                  |
| DONE_WITH_CONCERNS | 역할 범위는 끝났지만 다음 역할이 판단할 명시적 위험이 남았다.                                       |
| NEEDS_CONTEXT      | 안전한 결론에 필요한 정보·권한·독립 역할이 없다. 필요한 정보와 안전한 다음 행동을 함께 제시한다.    |
| BLOCKED            | 같은 차단 조건이 반복됐고 자체 진행이 불가능하다. 반복된 차단 근거와 사용자 결정 필요성을 제시한다. |

`NEEDS_CONTEXT`와 `BLOCKED`를 편의상 완료로 바꾸지 않는다. 반대로 미실행 단계가 단지 다음
역할의 책임이라는 이유만으로 현재 역할을 `BLOCKED`로 표시하지 않는다.

## 변경 권한과 독립성

- 읽기 전용 역할은 파일, Git, GitHub를 포함한 외부 서비스를 변경하지 않는다. 제안과
  보고서 작성도 파일 쓰기 권한이 명시된 경우에만 수행한다.
- frontend-developer와 code-reviewer는 동일 agent일 수 없다.
- `standard`와 `high-risk`의 qa-engineer는 frontend-developer와 분리한다.
- 프로덕션 `lightweight`도 구현자와 독립된 code-reviewer를 둔다.
- 동일 agent의 두 번째 pass, 자기 평가, 이전 수동 확인은 독립 handoff로 세지 않는다.
- 각 역할은 요청 접수 시, 구현 직전, 리뷰 직전 등급 변화와 승인 경계 이탈을 발견하면
  산출물 진행을 멈추고 다음 역할 입력에 escalation 근거를 남긴다.

## 읽기 전용 역할의 입력 계약

읽기 전용 역할 prompt에는 다음을 명시한다.

1. 읽을 수 있는 저장소 경로와 단일 요구사항 문서
2. 금지된 파일·Git·외부 서비스 변경
3. 판정할 등급 또는 품질 gate
4. 비교할 commit·diff·산출물
5. 고정 handoff 출력 형식

읽기 전용 역할이 수정안을 발견하면 patch를 적용하지 않고 파일과 근거 위치, 영향, 권장
수정을 반환한다.

## prompt fallback

runtime이 custom agent를 사용할 수 없으면 생략할 역할의
`.codex/agents/<role>.toml`에서 `developer_instructions`를 읽어 새 prompt에 주입하고 위
handoff 형식을 그대로 붙인다. 가능한 fresh context를 사용하고 구현자, qa-engineer,
code-reviewer를 각각 분리한다.

runtime이 분리 실행 자체를 지원하지 않으면 독립 QA·리뷰를 수행했다고 주장하지 않는다.
`NEEDS_CONTEXT`로 필요한 역할, 제공할 입력, 현재까지 안전하게 완료된 범위를 반환한다.

prompt fallback도 `lightweight`, `standard`, `high-risk` 등급과 요청 접수 시, 구현 직전,
리뷰 직전 재판정을 그대로 따른다. 사용자 승인 없는 Git worktree, `--no-verify`, Draft PR,
push는 fallback의 대안이 아니다.
