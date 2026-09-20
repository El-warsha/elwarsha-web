# Participant portal — v1 spec

Frozen 2026-09-20. Implementation PRs cite this file. The working board was
the Cursor canvas; this markdown is authoritative.

Public marketing pages are out of scope. Visual language stays the current
workshop tokens and CSS Modules. Tabs and accordion use Radix via `src/ui`
(ADR 0006). Reuse `PageSection`, `Button`, and `StatePanel`. Arabic and English
ship together. No Auth0 SDK in the browser. GitHub remains authoritative for
reviews and checks.

## Locked decisions

| Decision | Choice |
| -------- | ------ |
| Audience | Participants only. No mentor/admin chrome. |
| Sign-in | Auth0 in v1. HttpOnly session cookie from the API. |
| Home | This week. |
| Catalog | No Products or Cohorts in the portal. Cohort 01 is assumed. |
| GitHub | Listen to PRs and reviews on the week’s starting branches. No attach-PR form. |
| Progression | Current + previous weeks only. Maintainer sets Passed, then week N+1 unlocks. |

Product and cohort rows may still exist in the API (GitHub App installs hang
off repos). They are not portal features.

## Surfaces

| Surface | Route | v1 |
| ------- | ----- | -- |
| Sign in / This week | `/:locale/portal/` | Build |
| Visible weeks | `/:locale/portal/weeks/` | Build |
| Products | `/:locale/portal/products/` | Redirect to This week |
| Cohorts | `/:locale/portal/cohorts/` | Redirect to This week |
| Assignments (old shell) | `/:locale/portal/assignments/` | Redirect to Weeks |
| Submissions | `/:locale/portal/submissions/` | Redirect to This week |
| Reviews | `/:locale/portal/reviews/` | Redirect to This week |

Do not leave fixture shells on the redirected routes.

## Chrome

Public pages keep today’s header (Initiative, Roadmap, Participation, FAQ,
Portal). Brand always goes to `/:locale/`.

Inside `/:locale/portal/*`:

- Nav: **This week** · **Weeks** only
- Trailing: `displayName` as text · Sign out · locale toggle
- Sign out: `POST /api/v1/auth/logout`, then `/:locale/`
- Locale toggle rewrites the first path segment and keeps the rest
- `html[dir]` follows locale. Do not mirror layouts in CSS

## Sign in

Any portal route without a session shows the sign-in screen. Never show
fixtures.

- Eyebrow: Participant portal
- Title: Sign in to see this week
- Primary: Continue with Auth0 → full navigation to `GET {API}/api/v1/auth/login`
- `?auth=failed`: StatePanel above the CTA

Success redirect: `/{user.locale}/portal/`. Today the API always sends
`/ar/portal/` — that must change for v1.

Production requires `IDENTITY_PROVIDER=auth0` and Auth0 env vars. Tests keep
the fake identity adapter.

## This week

Current week = the latest week the participant has unlocked that is not
**Passed**. After week 8 is Passed, show a done state instead of a ninth week.

Layout:

1. Header: week number and title
2. Status strip (always visible)
3. Two content panels

### Status

One current label, plus three steps. Only the furthest reached step is filled.

| Status | When |
| ------ | ---- |
| Not started | No matching PR on the week’s starting branch(es). |
| PRs created | A listened PR exists for each required repo (web, API, or both). |
| PRs reviewed | The participant has submitted at least one GitHub review this week (peer review). `reviewerGithubUserId` matches their identity. |
| Passed | Maintainer marked the week complete. Unlocks week N+1. |

PRs created / reviewed are listened from GitHub. They do not auto-Passed.
There is no participant Complete button.

### Panels

Tabs on desktop. Accordion under 820px (existing header breakpoint).

**Details**

- Description / context. Not the task itself.
- Resources: list of title + URL, new tab.

**Assignment**

- Task body (what to implement).
- Starting branches: Open branch on `elwarsha-web` and/or `elwarsha-api`. The
  PR base is that branch.
- Listened PRs per repo: number, state, approvals, checks. Empty copy: No
  pull request on this branch yet.

A week may target web only, API only, or both. Both means one PR per repo.

### Listening

No attach-PR field. Match webhooks to the participant by `githubUserId`,
repository, and base branch. Snapshot existing fields (`number`, `state`,
`approvalCount`, `checksPassed`). `processDelivery` must persist those
snapshots; marking processed-only is not enough for v1.

## Visible weeks

Route: `/:locale/portal/weeks/`.

- Show current + previous only. Omit future weeks (do not show locked cards).
- Row: week number · title · status chip
- Opening a past week uses the same layout as This week, read-only except
  GitHub links

Unlock:

- Week 1 is visible once the participant has a membership
- Week N+1 becomes visible only after week N is Passed for that participant

## Shared states

| State | UI |
| ----- | -- |
| Loading | Preparing the workshop… |
| Signed out | Sign-in screen |
| No membership | Signed in, but you are not in this cohort yet. Do not fetch week catalog. |
| No PR yet | On Assignment panel |
| No review yet | Status stays on PRs created |
| Passed | Status strip; next week unlocks |
| Error | Existing workshop error copy |

Apply for the next cohort stays `mailto:hello@elwarsha.dev` on the public home.

## Contract gaps vs foundation

The pinned client and Prisma assignment model do not yet cover v1. Do not
silently invent fields in application code; extend the API contract and bump
`@elwarsha/api-client` when they land.

Needed for v1:

- Week details, resources[], assignment body — each in `ar` and `en`
- Per-week targets: repo(s) + starting branch
- Per-participant week status (PRs created / reviewed / Passed)
- Auth callback redirect using `user.locale`
- GitHub snapshot sync for PRs and reviews against starting branches

Catalog `draft / published / closed` is not the participant status strip.

## Out of v1

Products page, Cohorts page, mentor tools, application forms, in-app scoring,
attach-PR, Auth0 SDK in the browser, a new visual system.
