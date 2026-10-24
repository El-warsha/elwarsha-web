# ADR 0008 — TanStack Query for server state and caching

## Decision

Use TanStack React Query (`@tanstack/react-query`) for all asynchronous server state fetching, caching, deduplication, background revalidation, and mutations across `elwarsha-web`.

Raw `useEffect` + `useState` data fetching patterns are prohibited for server interactions.

Rules:

1. **Encapsulation in custom hooks**: Components must never invoke `useQuery` or `useMutation` directly with raw strings. Every query or mutation must live in a dedicated hook inside its feature folder (e.g. `src/features/weeks/useWeeks.ts`, `useWeekDetail.ts`).
2. **Hierarchical query keys**: Query keys must follow a consistent array structure: `['cohort', cohortSlug, 'weeks', locale]`.
3. **Zod integration in `queryFn`**: The query fetcher invokes the API client and parses the response through the feature's Zod schema before returning data to the hook.
4. **Declarative invalidation**: State modifications must execute via `useMutation`, calling `queryClient.invalidateQueries(...)` on success rather than manually mutating or refetching component-level state.

## Why

Hand-rolled `useEffect` data fetching suffers from well-documented pitfalls:

- **Race conditions**: Fast user navigation and route changes cause out-of-order response resolutions.
- **Waterfalls & redundant traffic**: Parallel components requesting the same endpoint trigger duplicate network requests.
- **Boilerplate state management**: Manually coordinating `isLoading`, `error`, `data`, and retry flags produces repetitive, fragile boilerplate.
- **Stale cache**: Keeping views in sync after submissions or edits requires ad-hoc callbacks or global context hacks.

TanStack Query cleanly separates **server state** (persisted on the server, asynchronous, shared) from **client UI state** (ephemeral component state). It provides out-of-the-box request deduplication, cache lifetimes (`staleTime`), background refetching on window focus, and declarative cache invalidation.

## Notes

- Global `QueryClient` is configured in `src/app/` with baseline defaults (`staleTime: 5 * 60 * 1000`, `retry: 1`, `refetchOnWindowFocus: false` in test environments).
- For unit and component tests, wrap test trees in a helper providing an isolated, clean `QueryClient` instance to prevent cache bleeding across tests.
