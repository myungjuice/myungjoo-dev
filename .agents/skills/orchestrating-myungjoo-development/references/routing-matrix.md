# 개발 작업 라우팅 매트릭스

## 등급 공식

등급은 **난이도·범위·위험도의 최댓값**이다. 세 축 중 하나라도 높으면 낮은 코드 양이나
파일 수로 상쇄하지 않는다.

| 축     | lightweight                | standard                   | high-risk                           |
| ------ | -------------------------- | -------------------------- | ----------------------------------- |
| 난이도 | 해법이 명확한 국소 변경    | 여러 상태·계층을 함께 판단 | 불확실한 계약, 복구가 어려운 결정   |
| 범위   | 단일 소비처·국소 문서      | 여러 컴포넌트·경로         | 전역·공용 계층, 저장소 밖 계약      |
| 위험도 | 실패 영향이 작고 즉시 복구 | 눈에 띄는 회귀 가능        | 보안·데이터·배포·광범위 사용자 영향 |

판정은 다음 세 시점에 같은 공식으로 반복한다.

1. `요청 접수 시`: 최초 범위, 완료 조건, 승인 경계를 정한다.
2. `구현 직전`: 조사·설계·테스트 계획으로 드러난 실제 영향을 반영한다.
3. `리뷰 직전`: 최종 diff, 새 의존성, 검증 공백, 복구 가능성을 반영한다.

중간에 새 위험이나 승인 범위 밖 변경을 발견하면 정규 시점을 기다리지 말고 즉시 멈춰
재판정한다. 등급은 낮아질 수도 있지만 이미 필요한 승인과 증거를 편의상 폐기하지 않는다.

## high-risk 자동 승급

다음 중 하나라도 해당하면 변경량과 무관하게 `high-risk`다.

- CSP, 인증, 인가, 권한, 보안 헤더, secret, 개인정보, XSS 방어
- 의존성, lockfile, 빌드·배포·런타임 설정, CI, 환경 변수 계약
- 외부 API 요청·응답 계약, 공유 타입·데이터 구조, 저장·삭제·마이그레이션
- 공통 Dialog와 공용 UI primitive, 전역 layout·theme·i18n 기반의 동작·스타일
- Server/Client 경계, hydration, 전역 Zustand 상태나 영속화 방식
- 여러 화면의 접근성·반응형·성능·SEO에 동시에 영향을 주는 변경
- 롤백이 불명확하거나 장애 영향이 넓은 변경
- 최초 완료 조건, 사용자 승인 범위, 다른 저장소의 조정 범위를 벗어난 발견

특히 “한 줄 CSP”, “한 파일 공통 Dialog”, “optional 필드인 외부 API 계약”은 자동 승급을
무효화하지 않는다.

## 작업 유형별 역할

표에서 필수는 반드시 별도 handoff를 받고, 조건부는 괄호 안 조건이 참일 때 참여시킨다.
사용할 수 있는 역할명은 아래 7개뿐이다.

| 작업 유형                    | 필수 역할                                                                                              | 조건부 역할                                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| 요구사항·완료 조건           | product-planner                                                                                        | product-designer (화면·상호작용), frontend-architect (기술 경계), qa-engineer (검증 가능성)                                   |
| 화면·상호작용                | product-planner, product-designer, frontend-developer, qa-engineer, code-reviewer                      | frontend-architect (공용·상태·경계), security-reviewer (입력·링크·민감 정보)                                                  |
| 프런트엔드 동작·상태·데이터  | product-planner, frontend-architect, frontend-developer, qa-engineer, code-reviewer                    | product-designer (사용자 경험), security-reviewer (신뢰 경계)                                                                 |
| 버그 수정·리팩터링·테스트    | frontend-developer, qa-engineer, code-reviewer                                                         | product-planner (완료 조건 불명확), product-designer (UI 영향), frontend-architect (구조 영향), security-reviewer (보안 영향) |
| 보안·CSP·빌드·배포           | product-planner, frontend-architect, frontend-developer, qa-engineer, code-reviewer, security-reviewer | product-designer (화면 영향)                                                                                                  |
| 공용 UI·Dialog·design system | product-planner, product-designer, frontend-architect, frontend-developer, qa-engineer, code-reviewer  | security-reviewer (입력·포커스·외부 콘텐츠)                                                                                   |
| 외부 API·공유 데이터 계약    | product-planner, frontend-architect, frontend-developer, qa-engineer, code-reviewer                    | product-designer (화면·오류 경험), security-reviewer (민감 데이터·권한)                                                       |
| 문서·GitHub 준비만           | product-planner                                                                                        | code-reviewer (기술 사실·공개 변경 검토)                                                                                      |

## 등급별 최소 구성

- `lightweight`: 프로덕션 코드면 frontend-developer와 구현자와 독립된 code-reviewer가
  필수다. QA 관찰은 품질 증거로 남긴다.
- `standard`: 해당 작업 유형의 필수 역할을 모두 사용하고 qa-engineer와 code-reviewer를
  frontend-developer와 분리한다.
- `high-risk`: 해당 작업 유형의 필수 역할에 전문 역할을 추가하고 qa-engineer,
  code-reviewer, 필요한 security-reviewer를 frontend-developer와 분리한다.

질문, 상태 확인, 설명, 읽기 전용 진단은 전체 개발 workflow 대상이 아니다. 다만 답변을
넘어 파일·Git·외부 서비스를 바꾸는 순간 요청 접수 시 판정부터 시작한다.
