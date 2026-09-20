# ElWarsha web architecture

The website is a Vite SPA with a feature-sliced layout adapted from
`crm-mobile`:

- `app` composes routes and providers
- `core` owns i18n, theme, logging, forms, and the API client
- `features` own pages and expose route descriptors
- `ui` owns primitives, components, and patterns. Look is CSS Modules plus
  tokens. Tabs, accordion, and similar behavior come from Radix (ADR 0006).
- `entities` own provider-neutral models

Public pages are rendered to static Arabic and English HTML by a Vite SSR
bundle, then hydrated in the browser. Canonical public URLs use trailing
slashes so static hosts resolve each route's `index.html`. Portal routes stay
client-rendered and read from the NestJS API through the pinned TypeScript
client.

Participant portal v1 (screens, status, week content, GitHub listening) is
specified in [`product/PORTAL.md`](product/PORTAL.md).

