# 최종 리뷰 수정 보고서

## 수정 범위

- `CompanyOverview`에서 빈 `contribution`과 빈 `achievements`의 제목·내용 블록을 렌더링하지 않도록 조건부 렌더링을 적용했다.
- 주요 성과 목록에 `list-disc space-y-1 pl-5` 클래스를 적용해 실제 불릿과 들여쓰기가 보이도록 했다.
- 컴포넌트 테스트에 빈 기여, 빈 성과, 불릿 스타일 회귀 사례를 추가했다.
- 이력서 복사 테스트에 개요 없음 및 빈 성과 데이터 사례를 추가했다. `jest.isolateModules`와 `jest.doMock`을 사용해 테스트 모듈 안에서만 경력 데이터를 대체하고, 각 테스트 후 모듈 및 mock을 복원한다.

## 실패 재현

수정 전 추가한 컴포넌트 테스트를 실행했을 때 다음 세 건이 실패했다.

- 빈 전반적 기여에서도 `전반적 기여` 라벨이 렌더링됨
- 빈 주요 성과에서도 `주요 성과` 라벨이 렌더링됨
- 주요 성과 `<ul>`에 `list-disc` 클래스가 없음

## 검증 결과

- `pnpm exec jest --runInBand 'src/app/career/\[slug\]/_components/__tests__/company-overview.test.tsx' src/lib/__tests__/resume-copy.test.ts`: 2개 스위트, 15개 테스트 통과
- `pnpm lint`: 통과
- `pnpm exec prettier --check src/app/career/[slug]/_components/company-overview.tsx src/app/career/[slug]/_components/__tests__/company-overview.test.tsx src/lib/__tests__/resume-copy.test.ts`: 통과
- `git diff --check`: 통과

## 환경 참고

기본 셸의 Node.js 18 환경에서는 Corepack이 시작되지 않아, 프로젝트 요구 버전인 Node.js 22 경로를 `PATH` 앞에 지정해 모든 pnpm 검증을 실행했다.
