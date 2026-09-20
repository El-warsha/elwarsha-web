# AGENTS.md — ElWarsha Web

Canonical implementation rules for the ElWarsha website.

Precedence: ADRs (`docs/adr/*`) > [`docs/product/PORTAL.md`](docs/product/PORTAL.md)
for portal behavior > `AGENTS.md`.

## Guardrails

- Allowed top-level areas: `src/app`, `src/core`, `src/entities`, `src/features`,
  `src/ui`, `src/test`.
- Features expose a small `index.ts` public API. Do not generate empty folders.
- Features may import `core`, `entities`, and `ui` only.
- All user-visible strings come from locale files.
- Visual values come from semantic tokens and CSS Modules. Interactive
  primitives use Radix, wrapped in `src/ui` (ADR 0006). Do not import
  `@radix-ui/*` from features. Do not add Tailwind or a themed component kit.
- Server data comes from `@elwarsha/api-client` (pinned snapshot 0.1.0). Zustand
  is only for ephemeral UI preferences such as locale.
- Do not import Firebase or Auth0 SDKs.
- Tests are required for non-trivial changes.
- Do not commit applicant CSVs or other personal data.
