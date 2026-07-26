# 구현 가이드

## 컴포넌트와 라우팅

- Next.js App Router에서 서버 컴포넌트를 기본으로 사용한다.
- `use client`는 상태, 브라우저 API, 이벤트 처리가 필요한 최소 경계에만 둔다.
- `window`, `document`, `localStorage` 같은 브라우저 API는 Client Component의 effect나
  이벤트 경계에서 접근한다. 서버와 첫 클라이언트 렌더의 결과를 결정적으로 유지해
  hydration 불일치를 만들지 않는다.
- 페이지 전용 컴포넌트는 해당 `src/app/<route>/_components/`에 둔다.
- 공용 UI는 `src/components/ui/`, 레이아웃은 `src/components/layout/`, 여러 화면에서 재사용하는 요소는 `src/components/shared/`를 우선 사용한다.
- shadcn/ui 컴포넌트는 필요한 이유 없이 구조를 바꾸지 않는다.

## 상태와 데이터

- Zustand 스토어는 `src/store/index.ts`의 `createStore`로 생성한다.
- export하는 스토어 훅은 `useShallow` 선택자 패턴을 사용한다.
- 컴포넌트가 필요한 상태와 action만 selector로 구독하고 selector 결과를 안정적으로
  유지해 불필요한 rerender를 만들지 않는다. 전체 store 구독은 근거가 있을 때만 사용한다.
- localStorage 영속화는 사용자 경험상 필요한 상태에만 적용한다.
- 서버 데이터나 정적 콘텐츠를 전역 스토어에 중복 저장하지 않는다.
- 기존 공용 `types`, `constants`, `store` 계층은 유지한다. 새 파일은 관련 기능 가까이에 둔다.

## 보안과 외부 경계

- secret과 서버 전용 환경 변수·모듈을 Client Component나 클라이언트 번들로 전달하지
  않는다. 공개 가능한 값만 명시적인 공개 환경 변수 계약으로 노출한다.
- 새 창으로 여는 외부 링크는 `rel="noopener noreferrer"` 등 목적에 맞는 안전한 속성을
  함께 사용하고 목적지와 referrer 노출을 검토한다.
- 사용자 입력 HTML을 그대로 렌더링하지 않는다. `dangerouslySetInnerHTML`이 불가피하면
  신뢰 경계와 검증된 sanitization을 먼저 설계하고 XSS 경로를 테스트한다.

## i18n과 접근성

- 사용자에게 보이는 텍스트를 추가·수정하면 ko/en 번역 리소스를 함께 갱신한다.
- 의미 있는 아이콘 버튼에는 접근 가능한 이름을 제공한다.
- 링크, 버튼, 입력 요소는 키보드 조작과 적절한 HTML 의미를 유지한다.
- 애니메이션과 전환은 `prefers-reduced-motion`을 존중하고, 모션을 줄여도 정보와 동작을
  잃지 않게 한다.
- 서버에서 언어별 결과가 실제로 달라져야 하는 변경에만 서버 언어 감지 방식을 검토한다.

## 스타일과 구현 품질

- Tailwind CSS v4와 기존 CSS 변수를 우선 사용한다.
- 조건부 Tailwind 클래스는 `cn()`으로 조합한다.
- 인라인 스타일은 기존 API가 요구하거나 동적 값이 필수인 경우에만 사용한다.
- Tailwind의 간격·크기 같은 표현용 수치 클래스는 매직 넘버 금지 규칙의 대상이 아니다.
- 함수 이름은 부수 효과를 드러내야 한다.
- Props 전달은 반복되거나 결합도가 높아질 때만 컴포지션 또는 Context로 개선한다. 얕은 전달 자체는 문제로 보지 않는다.
- 타입 안전성을 유지하고 `any`로 문제를 우회하지 않는다.

## 성능·검색 노출·운영 환경

- 이미지는 표시 크기에 맞는 크기·포맷·로딩 우선순위를 사용하고 레이아웃 이동을 막는다.
- 새 클라이언트 JavaScript와 의존성이 번들 크기와 Core Web Vitals에 미치는 영향을
  확인하고, 서버 렌더링이나 지연 로딩으로 줄일 수 있는지 검토한다.
- 페이지 변경은 metadata, heading 구조, canonical·외부 링크, 구조화된 콘텐츠 등 SEO
  영향을 확인한다.
- 로컬 성공만으로 운영 동작을 단정하지 않는다. `myungjoo.dev`의 환경 변수, origin,
  HTTPS, redirect, cache, CDN과 외부 API 정책 차이를 변경 범위에 맞게 검증한다.

## 테스트

- 동작을 변경하면 관련 Jest 테스트를 추가하거나 갱신할지 검토한다.
- 스토어, 훅, 유틸리티, 상호작용이 있는 UI는 기존 테스트 패턴을 따른다.
- 구현 세부사항보다 사용자가 보고 조작하는 동작, 접근 가능한 role·name, 상태 전환과 오류
  복구를 중심으로 테스트한다.
- 변경 후 관련 테스트를 먼저 실행하고, 최종적으로 `pnpm verify`를 수행한다.
