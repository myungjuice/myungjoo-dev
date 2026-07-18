## DONE

- Added `@react-pdf/renderer` dependency.
- Added resume PDF types and data generator for A/B/C templates, summary/detailed formats, Korean/English content, and local/deployed links.
- Added deterministic filename and data-generator tests.
- Commit: `94cda2c feat: add resume PDF data model`

## Validation

- `pnpm exec jest src/lib/__tests__/resume-pdf-data.test.ts --runInBand` — 3 passed.
- `pnpm lint` — passed.

## CONCERNS

- Company/project source data does not currently expose dedicated external links; generated links use the existing career route and project anchors.
- PDF rendering components are intentionally left to subsequent tasks.

## REVIEW FIXES

- Summary documents now intentionally contain reduced bio/skills and one project per company, while detailed documents retain the complete content.
- Local base URLs are normalized to `http://localhost:3000` (regardless of the dev server port); non-local URLs use `https://www.myungjoo.dev`.
- Portfolio and career links now derive from the normalized base URL.

## REVIEW FIX VALIDATION

- `pnpm exec jest src/lib/__tests__/resume-pdf-data.test.ts --runInBand` — 3 passed.
- `pnpm lint` — passed.
