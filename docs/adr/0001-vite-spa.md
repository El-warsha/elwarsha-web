# ADR 0001 — Vite SPA

## Decision

Use Vite + React + TypeScript as a client-rendered SPA, with build-time
prerender of the public locale routes.

## Why

The portal is authenticated and dynamic. The public site is a small, finite
set of pages that can be prerendered for crawlers without a server framework.
