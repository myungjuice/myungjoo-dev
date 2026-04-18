# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

---

## 언어 규칙

> **최우선 규칙**: 아래 언어 규칙을 항상 준수한다.

- 질문, 답변, 설명 등 모든 커뮤니케이션은 **한글**로 작성한다
- 코드 주석, 마크다운 문서 작성 시에도 **한글**을 사용한다
- 단, 코드 자체(변수명, 함수명, 클래스명 등)는 영문을 유지한다

---

## 프로젝트 개요

**myungjoo.dev** — 개인 포트폴리오 웹사이트. Vercel 배포 (`https://myungjoo.dev`).  
백엔드 레포: `https://github.com/myungjuice/myungjoo-dev-be`

---

## 기술 스택

| 분류            | 기술                                                 |
| --------------- | ---------------------------------------------------- |
| 프레임워크      | Next.js ^16.2.3 (App Router, Turbopack)              |
| 언어            | TypeScript ^6.0.2 (strict mode)                      |
| 스타일링        | Tailwind CSS v4 + shadcn/ui (Radix UI 기반)          |
| 상태 관리       | Zustand ^5.0.12 (devtools + immer 미들웨어)          |
| 다국어          | i18next + react-i18next + next-i18next (한국어/영어) |
| 애니메이션      | Framer Motion ^12.38.0                               |
| 코드 하이라이팅 | Shiki ^4.0.2                                         |
| 폰트            | Fira Code (Google Fonts, CSS 변수 `--font-fira`)     |
| 테스트          | Jest + React Testing Library (jsdom 환경)            |
| 패키지 관리     | pnpm 10.12.1 (Node >= 18.12.0)                       |

---

## 주요 명령어

```bash
pnpm dev         # 개발 서버 실행
pnpm build       # 프로덕션 빌드
pnpm start       # 프로덕션 서버 실행
pnpm lint        # ESLint 실행
pnpm format      # Prettier 포맷 검사
pnpm fix         # lint + format 함께 실행
pnpm test        # Jest 전체 테스트 실행
pnpm test -- --testPathPattern=경로/파일  # 특정 테스트만 실행
```

**Husky pre-commit 훅** — lint-staged가 변경된 `.js/.ts/.tsx` 파일에 자동으로 실행:  
`eslint --fix` → `prettier --write` → `jest --findRelatedTests --passWithNoTests`

---

## 디렉토리 구조

```
src/
├── app/                 # Next.js App Router
│   ├── (main)/          # 홈 페이지 (route group)
│   ├── about/           # About 페이지
│   ├── career/          # Career 페이지
│   ├── projects/        # Projects 페이지
│   └── layout.tsx       # 루트 레이아웃 (Providers, Layout 포함)
├── components/
│   ├── ui/              # shadcn/ui 컴포넌트 (Radix 기반)
│   ├── layout/          # Header, Footer 등 레이아웃 컴포넌트
│   ├── shared/          # 페이지 공통 컴포넌트
│   └── sidebar/         # 사이드바 컴포넌트
├── constants/           # 기능별 상수 (main.ts, career.ts, projects.ts, about/, header.ts 등)
├── hooks/               # 커스텀 React 훅
├── lib/
│   ├── i18n/            # i18next 클라이언트 설정
│   ├── get-lang-from-cookie.ts  # 서버 사이드 언어 감지
│   └── utils.ts         # cn(), getMappedKey(), sortByReference()
├── providers/           # React Provider 모음
├── store/               # Zustand 스토어
│   ├── index.ts         # createStore 팩토리 함수
│   ├── use-lang-store.ts
│   ├── use-about-page-store.ts
│   ├── use-career-page-store.ts
│   └── use-projects-page-store.ts
├── styles/
│   ├── globals.css      # CSS 변수 (라이트/다크)
│   ├── shadcn.css       # shadcn 컴포넌트 스타일
│   ├── custom.css       # 커스텀 애니메이션
│   └── theme/           # Tailwind 테마 확장 (colors.ts, typography.ts)
└── types/               # 공유 TypeScript 타입
```

각 페이지 폴더 내 `_components/`는 해당 페이지 전용 컴포넌트 디렉토리.

---

## 핵심 패턴

### Zustand 스토어 팩토리

`src/store/index.ts`의 `createStore`로 모든 스토어를 생성한다:

```typescript
const store = createStore<StoreType>(initializer, storeName, withPersist?);
export const useStore = <T>(selector: (state: StoreType) => T): T =>
  store(useShallow(selector));
```

- `withPersist = true`이면 localStorage에 영속화됨 (`use-lang-store.ts`가 해당)
- devtools는 `NEXT_PUBLIC_ENV === 'development'`일 때만 활성화

### 다국어

- 언어 선택은 Zustand(`use-lang-store`)로 관리되며 localStorage에 저장
- 서버 사이드는 `getLangFromCookie()`로 쿠키에서 읽음
- `I18nProvider`가 모든 페이지의 언어 상태를 동기화

### 스타일링

- Tailwind CSS v4, 클래스 기반 다크 모드 (`next-themes`)
- CSS 변수(`--background`, `--foreground` 등)는 `globals.css`에서 관리
- `prettier-plugin-tailwindcss`가 저장 시 Tailwind 클래스를 자동 정렬
- Path alias: `@/*` → `./src/*`

---

## 건드리면 안 되는 파일

- `pnpm-lock.yaml` — 수동 편집 금지, pnpm이 자동 관리
- `next-env.d.ts` — Next.js 자동 생성 파일
- `tsconfig.tsbuildinfo` — TypeScript 증분 컴파일 캐시, 자동 생성

---

## 스킬 라우팅

사용자의 요청이 아래 스킬에 해당하면, 직접 답하지 말고 스킬 도구를 **첫 번째 액션**으로 실행한다.

| 상황                                                        | 스킬               |
| ----------------------------------------------------------- | ------------------ |
| 새 기능 아이디어, 기획 브레인스토밍, "이거 만들 가치 있어?" | `/office-hours`    |
| 코드 작성 전 설계/아키텍처 검토                             | `/plan-eng-review` |
| PR 전 코드 리뷰, "내 코드 봐줘"                             | `/review`          |
| "이거 테스트해줘", "버그 찾아줘", 브라우저 QA               | `/qa`              |
| "배포해줘", "PR 만들어줘", "푸시해줘"                       | `/ship`            |
| 버그, 에러, "왜 안되지?", 스택 트레이스 디버깅              | `/investigate`     |
| 위험한 작업 (프로덕션, DB 수정 등)                          | `/careful`         |
| "여기까지 저장해줘", "어디까지 했지?", 작업 중간 상태 저장  | `/checkpoint`      |
