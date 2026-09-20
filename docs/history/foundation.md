# Foundation history

## 2026-09-06 — Initial web foundation

User request: implement the bilingual React starter against the NestJS API
plan, using Yarn 4 and the crm-mobile feature-sliced boundaries.

Files: Vite app, locale routes, portal shells, Storybook, Playwright, CI.

ADRs: 0001–0003.

## 2026-09-20 — Design system tokens

Mapped Figma Field Notes v4 variables (Cover; no Foundations page in the file)
into `src/core/theme/tokens.css`. Starter names (`--ink`, `--paper`, `--space-*`)
remain aliases.

## 2026-09-20 — CSS Modules and Radix

ADR 0006: style with tokens and CSS Modules; Radix for unstyled primitives
behind `src/ui`. No Tailwind or themed kits.

## 2026-09-20 — Portal v1 product spec

Froze participant portal v1 in `docs/product/PORTAL.md`: Auth0 sign-in, this
week (status + details/resources + assignment), visible current/previous weeks,
GitHub listen on starting branches, no Products or Cohorts in the portal.

## 2026-09-06 — Foundation review fixes

Public routes now ship rendered localized HTML and hydrate in place. Locale
switching preserves deep links, invalid locales redirect to Arabic, and the
versioned API client is installed as a vendored package dependency.
