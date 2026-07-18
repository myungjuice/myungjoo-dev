## Task 2 report

- Implemented A/B/C React PDF templates with genuinely different layouts: hierarchical, profile-panel, and compact timeline.
- All templates consume `ResumePdfDocumentData`, preserve summary/detail content differences, and expose company/project/portfolio links.
- Added shared A4 styles and `ResumePdfDocument` dispatcher.
- Validation: `npx tsc --noEmit` has no errors in the new resume-pdf files; existing unrelated test fixture type errors remain.
- Concern: PDF font fallback is Helvetica; Korean glyph embedding may require a registered project font in a later task.
