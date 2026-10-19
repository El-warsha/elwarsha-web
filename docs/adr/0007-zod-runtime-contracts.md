# ADR 0007 — Zod for runtime contract validation and schema inference

## Decision

Validate all external and untrusted data crossing into the web application at the boundary using Zod schemas (`.parse()`), and infer static TypeScript types directly from schemas (`z.infer<typeof schema>`).

This applies to:
- HTTP API responses from `@elwarsha/api-client` and fetch endpoints.
- Route parameters and URL query parameters.
- Form inputs and client-side form submissions.

Features and components must consume validated domain models and inferred types, never applying unchecked type assertions (`as MyType`) to raw network payloads.

## Why

TypeScript interfaces and types exist only at compile time and disappear completely in production JavaScript. If an API contract drifts, returns missing fields, or serves unexpected null values, unchecked type assertions cause opaque runtime crashes deep in React rendering trees (`Cannot read properties of undefined`).

Zod provides an active Anti-Corruption Layer (ACL) at the application seam:
1. **Fails fast and loudly**: Schema mismatches throw immediately at the network boundary with exact property paths, making contract breakage trivial to detect in development and tests.
2. **Single source of truth**: Schemas declare runtime validation rules and compile-time TypeScript types simultaneously, eliminating type duplication.
3. **Data parsing and coercion**: Zod safely coerces primitives (e.g. string query params into numbers, dates into `Date` objects, defaults for optional flags).

## Notes

- Place feature-specific schemas in `src/features/<feature>/<feature>.schema.ts` (e.g. `src/features/weeks/weeks.schema.ts`).
- Shared domain models reside in `src/entities/`.
- Component tests should assert graceful rendering when schemas pass, and error boundary triggering when malformed payloads fail parsing.
