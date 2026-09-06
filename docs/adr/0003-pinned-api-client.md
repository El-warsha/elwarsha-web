# ADR 0003 — Pinned OpenAPI client

## Decision

The web app vendors `@elwarsha/api-client@0.1.0` as a local package dependency
instead of duplicating DTO types inside application code.

## Why

Separate repositories should not share types by copy-paste. A versioned client
makes contract changes explicit.
