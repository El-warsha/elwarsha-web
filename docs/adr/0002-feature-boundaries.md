# ADR 0002 — Feature-sliced boundaries

## Decision

Keep `app`, `core`, `entities`, `features`, `ui`, and `test`. Features never
import other features.

## Why

Candidates should practice navigating an existing enterprise-style client
without a dumping ground of helpers.
