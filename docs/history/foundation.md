# Foundation history

## 2026-09-06 — Initial web foundation

User request: implement the bilingual React starter against the NestJS API
plan, using Yarn 4 and the crm-mobile feature-sliced boundaries.

Files: Vite app, locale routes, portal shells, Storybook, Playwright, CI.

ADRs: 0001–0003.

## 2026-09-06 — Foundation review fixes

Public routes now ship rendered localized HTML and hydrate in place. Locale
switching preserves deep links, invalid locales redirect to Arabic, and the
versioned API client is installed as a vendored package dependency.
