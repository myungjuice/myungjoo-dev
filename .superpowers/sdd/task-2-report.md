## Task 2 report

- Implemented A/B/C React PDF templates with genuinely different layouts: hierarchical, profile-panel, and compact timeline.
- All templates consume `ResumePdfDocumentData`, preserve summary/detail content differences, and expose company/project/portfolio links.
- Added shared A4 styles and `ResumePdfDocument` dispatcher.
- Validation: `npx tsc --noEmit` has no errors in the new resume-pdf files; existing unrelated test fixture type errors remain.
- Concern: PDF font fallback is Helvetica; Korean glyph embedding may require a registered project font in a later task.

## Review fixes (acb6f01)

- Added `resume-pdf-document.test.tsx` covering A/B/C dispatch data, English content, summary/detail differences, and links.
- Localized section labels in every template and rendered detailed contribution/achievement content only for detailed format.
- Added portfolio GitHub links to all layouts and enabled wrapped A4 pages for long detailed documents.
- Validation: targeted Jest test passed (5 tests); lint-staged ESLint/Prettier/Jest checks passed during commit.

## Final review fixes

- Render tests now import the document dispatcher with a lightweight react-pdf primitive mock and walk the actual A/B/C element trees, rather than only checking data dispatch.
- Template A now hides achievement bullets in summary format; Template C renders detailed contribution and achievement content.
- Template B career blocks use `wrap={false}` so individual entries remain intact while the surrounding A4 page continues to flow across multiple pages.
- Validation: `pnpm exec jest src/lib/__tests__/resume-pdf-document.test.tsx --runInBand` (6 tests passed).
