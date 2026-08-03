---
name: orchestrating-myungjoo-development
description: Use when planning, implementing, debugging, refactoring, testing, reviewing, or preparing GitHub changes in the myungjoo.dev repository
---

# myungjoo.dev 개발 오케스트레이션

## 1. 목적과 핵심 원칙

개발 요청을 위험에 맞는 역할, 승인, 증거로 연결한다. 코드 양이나 파일 수가 아니라
난이도·범위·위험도의 최댓값으로 `lightweight`, `standard`, `high-risk`를 정한다. 보안,
외부 계약, 데이터, CI·배포, 전역 장애 영향은 변경량과 무관하게 `high-risk`다. 상세 판정과
역할은 [routing matrix](references/routing-matrix.md), 증거는
[quality gates](references/quality-gates.md), 역할 출력은
[handoff contracts](references/handoff-contracts.md)를 따른다.

## 2. 질문·상태 확인과 개발 작업 구분

설명, 현황 조회, 읽기 전용 보고처럼 변경 의도가 없는 요청은 전체 개발 workflow에서
제외한다. 파일·코드·설정·데이터·화면·GitHub 상태를 바꾸거나 변경안을 준비하면 개발
작업이다. 진단 요청은 읽기 전용으로 원인과 근거까지만 제시하며, 수정 권한을 추론하지
않는다.

작은 후속 작업과 리뷰 수정은 같은 세션에서 이어간다. 독립 마일스톤 완료, 이슈·저장소
전환 또는 맥락 품질 저하가 예상되면 새 세션을 제안하고 사용자 승인 후 handoff를 만든다.

## 3. 등급 판정과 세 번의 재판정

동일한 공식을 `요청 접수 시`, `구현 직전`, `리뷰 직전`에 반드시 다시 적용하고 판정 근거를
남긴다. 보안, 외부 계약, 데이터, CI·배포, 전역 장애 영향이나 승인된 완료 조건 밖의
범위를 발견하면 즉시 멈춘다. 이전 등급과 승인은 새 범위를 덮지 않는다. 더 높은 등급으로
재판정하고 사용자에게 영향, 선택지, 권장안, 승인 경계를 다시 제시한다.

## 4. 최소 역할 라우팅

`lightweight`는 작업 오케스트레이터가 직접 처리하는 것을 기본으로 하고 필요할 때만 단일
Frontend Developer를 사용한다. `standard`는 Frontend Developer와 독립 Code Reviewer를
기본으로 한다. 나머지 역할은 작업의 실제 조건이 있을 때만 추가한다. `high-risk`는 전담
QA Engineer와 독립 Code Reviewer, 조건별 전문 역할과 복구 근거를 유지한다. 상세 조건은
[routing matrix](references/routing-matrix.md)를 따른다.

## 5. Superpowers 연결

**REQUIRED SUB-SKILL:** 기능·동작·설계 변경 전 `superpowers:brainstorming`

**REQUIRED SUB-SKILL:** 기능·버그 구현 전 `superpowers:test-driven-development`

**REQUIRED SUB-SKILL:** 완료 주장 전 `superpowers:verification-before-completion`

버그나 예기치 않은 실패는 `superpowers:systematic-debugging`으로 원인을 확인한다. 승인된
계획을 실행할 때만 실행용 Superpowers를 선택하며, 현재 작업 계약이 금지한 격리 방식이나
위임을 임의로 추가하지 않는다.

## 6. 승인 경계

AGENTS.md가 정한 이슈, 실행 방식, 화면 설계, 사용자 동작, 데이터 구조, 의존성,
빌드·배포 설정과 외부 변경의 승인을 구현 전에 받는다. 승인 요청은 권장안을 먼저 두고
번호 선택지와 영향 범위를 제시한다. 범위가 넓어지거나 복구 방법이 달라지면 작업을
중단하고 재승인한다. 긴급성, 매몰 비용, 하위 호환, 담당자의 경험은 승인 확장의 근거가
아니다.

## 7. 구현자 독립 리뷰·QA

프로덕션 코드는 `lightweight`여도 구현자와 독립된 코드 리뷰가 필수다. `standard`의 Code
Reviewer는 완료 조건 기반 QA 증거의 충분성도 확인한다. 실제 사용자 동작·브라우저
검증·넓은 회귀가 있으면 구현자와 다른 QA Engineer를 추가하고, `high-risk`에서는 전담 QA
Engineer를 반드시 둔다. 같은 agent의 자기 검토나 기존 수동 확인을 독립 증거로 세지
않는다. 분리가 불가능하면 `NEEDS_CONTEXT`로 필요한 역할과 안전한 다음 행동을 넘긴다.

## 8. 검증과 완료

등급별 필수 증거와 웹 공통 gate를 [quality gates](references/quality-gates.md)에서 골라
실행한다. 명령 이름이 아니라 종료 코드, 핵심 결과, QA 관찰, 남은 위험을 기록한다.
동일한 HEAD에서 성공한 `pnpm verify`는 검증 환경과 도구가 바뀌지 않고 명령·HEAD·종료
코드가 기록된 경우에만 재사용한다. `high-risk`는 복구 방법과 승인 경계를 확인하고 최종
HEAD의 전체 검증 증거가 있어야 한다. 모든 역할은 고정된
[handoff 형식](references/handoff-contracts.md)으로 결과를 반환한다.

## 9. Git/PR 금지 동작

사용자 승인과 현재 작업 계약 없이 Git worktree 생성, 브랜치 전환, commit, push, PR,
merge, tag, GitHub Release를 실행하지 않는다. `--no-verify`나 다른 hook 우회는 금지한다.
Draft PR도 PR이므로 승인 전 만들지 않는다. 코드·설정 변경은 `develop` 대상 PR이
기본이며, push·PR 전 대상 브랜치의 템플릿을 읽고 제목, 본문, Assignee `myungjuice`,
라벨 초안을 승인받는다.

## 10. prompt fallback

runtime이 custom agent를 지원하지 않으면 필요한 `.codex/agents/<role>.toml`의
`developer_instructions`와 [handoff 형식](references/handoff-contracts.md)을 새 prompt에
주입한다. 가능한 별도 context로 구현, QA, 리뷰를 분리한다. 분리를 보장할 수 없으면 그
한계를 숨기지 않고 `NEEDS_CONTEXT`로 반환한다.

## 11. 흔한 실수와 중단 신호

“한 줄이라 안전하다”, “한 파일이라 역할을 생략한다”, “처음 등급을 유지한다”, “호환
변경이라 재승인이 없다”, “구현자가 QA와 리뷰도 한다”, “일단 push한다”는 중단 신호다.
발견 즉시 변경을 멈추고 등급, 승인 경계, 역할 독립성, 필요한 증거를 다시 확인한다.
