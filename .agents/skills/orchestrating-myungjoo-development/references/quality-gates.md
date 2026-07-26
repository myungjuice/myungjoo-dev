# 개발 품질 게이트

## 등급별 필수 증거

| 등급        | 필수 증거                                                                         |
| ----------- | --------------------------------------------------------------------------------- |
| lightweight | 범위, 관련 테스트·정적 검사, QA 관찰, 프로덕션 코드의 구현자와 독립된 리뷰        |
| standard    | 승인된 완료 조건, 테스트 RED/GREEN, 관련 검증, QA 증거, 구현자와 독립된 코드 리뷰 |
| high-risk   | standard 전체, 전문 역할 검토, 복구 방법, 승인 경계, 전체 `pnpm verify`           |

증거에는 실행 시각보다 대상, 명령 또는 관찰 방법, 종료 코드·결과, 실패와 경고, 남은
위험을 기록한다. “문제없음”, 과거 수동 확인, 구현자의 자기 리뷰만으로 gate를 통과시키지
않는다. `standard`의 독립 Code Reviewer는 완료 조건 기반 QA 증거를 확인하고, 실제 사용자
동작·브라우저·넓은 회귀 조건으로 QA Engineer를 추가한 경우 구현자와 분리한다.
`high-risk`의 전담 QA Engineer와 Code Reviewer는 모두 구현자와 분리한다.

## 기계 판독 계약

다음 표가 역할 라우팅·검증 재사용·대화 운영에 대한 기계 판독의 단일 기준이다. 설명
문구는 가독성을 위한 것이며 validator는 아래 key와 value의 정확한 조합을 검사한다.

| key                                          | value                              |
| -------------------------------------------- | ---------------------------------- |
| `routing.lightweight.executor`               | `orchestrator-direct`              |
| `routing.standard.default-agents`            | `frontend-developer,code-reviewer` |
| `routing.standard.reviewer-qa-evidence`      | `required`                         |
| `routing.high-risk.dedicated-qa`             | `qa-engineer`                      |
| `routing.high-risk.specialists-and-recovery` | `required`                         |
| `verification.same-head-reuse`               | `recorded-success-only`            |
| `conversation.new-implementation`            | `new-conversation`                 |

## 단계별 gate

### 요청 접수 시

- 연결 이슈와 승인된 완료 조건, 제외 범위, 사용자 선택을 기록한다.
- 난이도·범위·위험도의 최댓값과 자동 승급 사유를 기록한다.
- 필요한 역할, 독립성, 승인 경계, 예상 복구 방법을 정한다.

### 구현 직전

- 관련 가이드와 기존 패턴을 확인하고 최종 설계·테스트 범위를 다시 판정한다.
- 기능·버그 구현은 테스트가 의도한 이유로 실패한 RED 증거 뒤에 시작한다.
- 의존성, 외부 계약, 데이터 구조, 화면 설계, 빌드·배포 영향이 늘면 멈추고 재승인한다.

### 리뷰 직전

- `git status`와 최종 diff로 승인 범위 밖 파일, 생성물, secret을 확인한다.
- GREEN 증거, 관련 테스트, 정적 검사, QA 관찰, 복구 방법을 모은다.
- 최종 diff로 등급을 재판정한 뒤 독립 리뷰와 필요한 전문 검토를 요청한다.

## 웹 공통 gate

변경과 관련 있는 항목은 아래 질문과 증거를 handoff에 남긴다.

| 영역        | 확인 항목                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------- |
| 렌더링 경계 | Server/Client 경계가 최소인가, hydration 불일치나 불필요한 `use client`가 없는가            |
| 보안        | secret 노출, XSS 입력·출력 경로, CSP 영향, 외부 링크의 안전한 속성과 목적지가 검토됐는가    |
| 상태        | Zustand store가 `createStore`를 따르고 export selector가 `useShallow` 패턴을 유지하는가     |
| 국제화      | 사용자 노출 텍스트의 i18n ko/en 리소스가 함께 갱신되고 두 언어가 검증됐는가                 |
| 접근성      | 의미 구조, accessible name, 키보드, 포커스, 대비가 검증됐는가                               |
| 화면 적응   | 반응형, 다크 모드, reduced motion에서 콘텐츠와 상호작용이 유지되는가                        |
| 성능        | 이미지 크기·포맷, 번들 증가, Core Web Vitals 영향과 불필요한 client JavaScript가 확인됐는가 |
| 검색 노출   | metadata, heading, canonical·외부 링크, 구조화 콘텐츠 등 SEO 영향이 확인됐는가              |

## 검증 명령 선택

가장 좁은 관련 테스트부터 실행하고 변경 범위에 따라 `pnpm lint`, `pnpm format`,
`pnpm test`, `pnpm build`를 확장한다. 작업 중에는 좁은 관련 검증을 사용하고 최종 HEAD에서
전체 `pnpm verify`를 한 번 실행한다.

동일한 HEAD에서 성공한 `pnpm verify`는 코드·설정·의존성·Node/pnpm 환경과 검증 도구가
그대로이고 성공한 명령, 대상 HEAD, 종료 코드가 기록된 경우에만 재사용한다. HEAD나 위
검증 환경 중 하나라도 바뀌면 전체 검증을 다시 실행한다. `high-risk`도 일부 명령 성공으로
대체할 수 없지만 이 조건을 만족하는 동일 HEAD 전체 검증 증거는 재사용할 수 있다. hook
실패를 `--no-verify`로 우회하지 않는다.

Git worktree, Draft PR, push 같은 Git·GitHub 동작은 검증 증거가 아니며 별도 승인 경계를
따른다. 실패한 gate가 있으면 완료를 주장하지 말고 상태와 안전한 다음 행동을 handoff한다.
