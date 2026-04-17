# 코드 원칙

## 이른 추상화 금지

사용 사례가 달라질 가능성이 있으면 중복을 허용한다.

```tsx
// ❌ 이른 추상화 — 두 버튼의 요구사항이 달라지는 순간 props가 폭발함
function ActionButton({ label, onClick, variant }: Props) { ... }

// ✅ 처음엔 중복을 허용
function SubmitButton() { ... }
function CancelButton() { ... }
```

---

## Props 드릴링 제거

컴포지션(`children`) 패턴 또는 Context API를 사용한다.

```tsx
// ❌ 드릴링 — theme이 중간 컴포넌트를 거쳐 내려감
<Layout theme={theme}>
  <Section theme={theme}>
    <Card theme={theme} />
  </Section>
</Layout>

// ✅ 컴포지션 — Card를 호출부에서 직접 조합
<Layout>
  <Section>
    <Card />
  </Section>
</Layout>
```

---

## 상태는 좁게

광범위한 훅 대신 책임이 명확한 작은 훅으로 분리한다.

```tsx
// ❌ 하나의 훅이 너무 많은 책임
function useCareerPage() {
  const [tab, setTab] = useState()
  const [filter, setFilter] = useState()
  const [modal, setModal] = useState()
  ...
}

// ✅ 책임별로 분리
function useCareerTab() { ... }
function useCareerFilter() { ... }
function useCareerModal() { ... }
```

---

## 조건부 UI 분기

역할/상태가 크게 다른 경우 별도 컴포넌트로 분리한다.

```tsx
// ❌ 하나의 컴포넌트가 완전히 다른 두 UI를 담당
function UserCard({ isAdmin }: Props) {
  if (isAdmin) return <div>...어드민 전용 복잡한 UI...</div>
  return <div>...일반 유저 UI...</div>
}

// ✅ 역할별로 분리
function AdminCard() { ... }
function UserCard() { ... }
```

---

## 숨겨진 사이드 이펙트 금지

함수명이 암시하는 동작만 수행한다.

```tsx
// ❌ get 함수가 상태를 바꿈
function getUser(id: string) {
  setLoading(true) // 예상치 못한 사이드 이펙트
  return users[id]
}

// ✅ 이름이 동작을 정확히 설명
function fetchUser(id: string) {
  setLoading(true)
  return api.get(`/users/${id}`)
}
```

---

## 매직 넘버 금지

반드시 네이밍된 상수로 대체한다.

```tsx
// ❌ 숫자의 의미를 알 수 없음
setTimeout(() => setVisible(false), 300)

// ✅ 의미가 명확한 상수
const TOAST_HIDE_DELAY_MS = 300
setTimeout(() => setVisible(false), TOAST_HIDE_DELAY_MS)
```

---

## 파일은 기능/도메인 단위로 구성

타입별이 아닌 관련 파일끼리 묶는다.

```
// ❌ 타입별 분류 — career 관련 파일이 여러 폴더에 흩어짐
hooks/useCareerFilter.ts
types/career.ts
utils/careerUtils.ts

// ✅ 도메인별 분류 — 관련 파일이 한 곳에
career/
  useCareerFilter.ts
  types.ts
  utils.ts
```
