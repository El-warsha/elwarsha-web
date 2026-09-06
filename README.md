# ElWarsha Web

Bilingual React starter for the ElWarsha initiative and participant portal.
This repository is the web app (`elwarsha-web`). The API lives in the sibling
`ElWarsha-api` folder.

The API lives in the sibling `ElWarsha-api` repository. This app pins
`@elwarsha/api-client@0.1.0`.

## Local setup

```bash
corepack enable
cp .env.example .env
yarn install
yarn dev
```

Public routes are locale-prefixed: `/ar`, `/en`, `/ar/roadmap`, `/en/faq`.
Bare `/` redirects from the stored or browser locale.

## Scripts

| Command          | Purpose                               |
| ---------------- | ------------------------------------- |
| `yarn dev`       | Vite development server               |
| `yarn test`      | Vitest                                |
| `yarn e2e`       | Playwright smoke                      |
| `yarn storybook` | UI catalog                            |
| `yarn build`     | Production build and public prerender |

## Privacy

Applicant form exports stay out of git. `*.csv` is ignored.
