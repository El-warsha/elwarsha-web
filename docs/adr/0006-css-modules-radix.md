# ADR 0006 — CSS Modules and Radix primitives

## Decision

Style with CSS Modules and semantic tokens in `src/core/theme/tokens.css`.
Interactive primitives (tabs, accordion, and similar) come from Radix UI.
Features import wrapped components from `src/ui`, never `@radix-ui/*` directly.

## Why

The workshop look stays in our tokens. Radix supplies behavior, keyboard, and
RTL-capable primitives without a themed component kit or Tailwind.

## Notes

Do not add MUI, Chakra, Ant, Mantine, Tailwind, or shadcn. Paint happens in
CSS Modules. Storybook remains the visual contract (ADR 0005).
