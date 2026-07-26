# AGENTS.md

## 언어 규칙

- 질문, 답변, 설명을 포함한 모든 커뮤니케이션은 한글로 작성한다.
- 코드 주석과 Markdown 문서도 한글로 작성한다.
- 변수, 함수, 클래스 등 코드 식별자는 영문을 유지한다.

## 프로젝트 개요

**myungjoo.dev**는 이직과 채용 제안을 위해 활용하는 개인 포트폴리오 웹사이트다. Vercel에 배포하며, 백엔드 저장소는 `myungjoo-dev-be`다.

현재 의존성 버전과 실행 가능한 명령은 항상 `package.json`을 기준으로 확인한다. 패키지 관리자는 pnpm이며 Node.js `>=22.22.1`이 필요하다.

## 프로젝트 구조

```text
src/
├── app/          # Next.js App Router 페이지와 페이지 전용 _components
├── components/   # ui, layout, shared, sidebar 공용 컴포넌트
├── constants/    # 화면 콘텐츠와 기능별 상수
├── hooks/        # 커스텀 React 훅
├── lib/          # i18n, 유틸리티, 서버 보조 함수
├── providers/    # i18n·테마 Provider
├── store/        # Zustand 스토어와 팩토리
├── styles/       # 전역·shadcn·테마 스타일
└── types/        # 공유 타입
```

## 작업 원칙

- 개발 작업은 먼저 `.agents/skills/orchestrating-myungjoo-development/SKILL.md`를 사용해
  분류하고, 상세 routing·quality gate·handoff 기준은 해당 skill의 `references/`를 따른다.
- 작업 등급은 난이도·범위·위험도의 최댓값으로 `lightweight`, `standard`, `high-risk` 중
  하나를 정한다. 요청 접수 시, 구현 직전, 리뷰 직전에 같은 기준으로 재판정하고 승인
  범위 밖 영향이 드러나면 즉시 멈춰 다시 판정한다.
- 중요한 의사결정과 GitHub·Git 외부 변경은 선택지, 권장안, 영향 범위를 먼저 제시하고 사용자 승인 후에만 실행한다.
- 사용자에게 선택을 요청할 때는 권장안을 먼저 밝히고, `1.`, `2.`, `3.` 형식의 번호 선택지를 제공한다. 권장 선택지의 끝에는 `(추천)`을 표시한다.
- 작업 시작 시 연결된 GitHub 이슈를 확인한다. 이슈가 없으면 등록 여부를 먼저 질문하고, 사용자가 원하면 한글 이슈 초안을 제시해 승인받은 뒤 생성한다.
- 코드 또는 설정 변경은 `develop` 대상 PR이 기본이다. 코드·설정 변경이 없는 문서 또는 단순 텍스트 변경만 직접 푸시를 제안할 수 있으며, 이 경우도 사용자 승인 후에만 푸시한다.
- PR 초안에는 제목, 본문, 대상 브랜치, Assignee `myungjuice`, 의미 있는 라벨을 포함한다. PR 본문은 대상 브랜치의 `.github/PULL_REQUEST_TEMPLATE.md`를 먼저 읽어 그 형식을 그대로 채운다. 사용자 승인 전에는 PR, 푸시, 병합, 태그, GitHub Release를 생성하지 않는다.
- 의존성 변경, 빌드·배포 설정 변경, 사용자 동작·데이터 구조·화면 설계 변경은 구현 전에 승인받는다.
- 프로덕션 코드는 구현자와 독립된 코드 리뷰를 받는다. `standard`와 `high-risk` 작업의
  QA는 구현자와 다른 agent가 완료 조건과 실제 사용자 동작을 검증한다.
- 구현 완료 전에는 변경 범위에 맞는 테스트와 검증을 실행하고, 종료 코드와 핵심 결과를
  근거로 보고한다. 최종 전체 검증은 `pnpm verify`로 실행한다.

## 작업 가이드

- 요청 분류, 승인, 역할 흐름: `.codex/guides/workflow.md`
- 구현과 웹 품질 기준: `.codex/guides/engineering.md`
- 브랜치, 이슈, PR, 직접 푸시, 릴리즈: `.codex/guides/git-and-release.md`
- CodeRabbit, 독립 코드 리뷰, QA: `.codex/guides/review.md`

## 핵심 패턴

- Zustand 스토어는 `src/store/index.ts`의 `createStore`로 만들고, export 훅은 `useShallow` 선택자 패턴을 따른다.
- 언어는 `use-lang-store`와 i18next로 관리한다. 사용자 노출 텍스트를 변경하면 ko/en 번역 리소스를 함께 갱신한다.
- Tailwind CSS v4와 shadcn/ui를 사용한다. 조건부 클래스는 `cn()`을 사용한다.
- 페이지 전용 컴포넌트는 해당 `src/app/<route>/_components/`에 둔다.

## 검증 명령

변경 범위에 맞는 가장 좁은 검증부터 실행하고, 완료 전에는 전체 검증을 실행한다.

```bash
pnpm verify
```

## 수동 편집 금지 파일

- `pnpm-lock.yaml`
- `next-env.d.ts`
- `tsconfig.tsbuildinfo`
