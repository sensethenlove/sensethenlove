# Sense Then Love

## Helpful links
#### Documentation
- [Svelte](https://svelte.dev/docs)
- [Svelte Kit](https://kit.svelte.dev/docs/introduction)
- [Prisma](https://www.prisma.io/docs)
- [Prisma Data Platform](https://www.prisma.io/docs/data-platform)
- [Prisma Client](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Prisma Schema](https://www.prisma.io/docs/concepts/components/prisma-schema)
- [PlanetScale](https://planetscale.com/docs)
- [Cloudflare Workers](https://kit.svelte.dev/docs/adapter-cloudflare-workers)
- [Cloudflare Images](https://developers.cloudflare.com/images/)
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)
- [Sendgrid](https://github.com/sendgrid/sendgrid-nodejs)
- [Markdown](https://www.markdownguide.org/basic-syntax)
- [Open Graph](https://ogp.me/)

#### Code Examples
- [Sveltekit + Prisma](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-sveltekit)
- [Sveltekit + Turnstile](https://github.com/ghostdevv/svelte-turnstile)
- [Sveltekit Authentication](https://github.com/huntabyte/sveltekit-protected-routes/tree/final-code)
- [Subtle Crypto](https://github.com/diafygi/webcrypto-examples#rsa-pss---generatekey)
- [Cloudflare + JWT](https://github.com/tsndr/cloudflare-worker-jwt/blob/76b7fcef2707225c9214fcba0c4e8d6498039daa/src/index.ts)

#### Articles
- [Prisma + NextJS](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)
- [Using Prisma with Planetscale](https://www.prisma.io/docs/guides/database/using-prisma-with-planetscale)
- [Prisma + Cloudflare Workers](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers)
- [Prisma + Data Proxy](https://www.prisma.io/docs/data-platform/data-proxy)
- [ECDSA vs RSA](https://sectigostore.com/blog/ecdsa-vs-rsa-everything-you-need-to-know/)
- [SubtleCrypto + JWT](https://coolaj86.com/articles/sign-jwt-webcrypto-vanilla-js/)

#### Videos
- [Learn Prisma In 60 Minutes](https://www.youtube.com/watch?v=RebA5J-rlwg)
- [Prisma & PlanetScale Best Practices](https://www.youtube.com/watch?v=iaHt5_hg44c)
- [MySQL Scaling Made Easy](https://planetscale.com/events/mysql-scaling-made-easy/thank-you)

#### Utilities
- [Squoosh](https://squoosh.app)
- [SVG Icons](https://icones.js.org/collection/all)
- [Flowbite](https://flowbite-svelte.com/)
- [Jwt.io](https://jwt.io/)

#### Pricing
- [Cloudflare Workers: FREE = 100,000 requests a day](https://developers.cloudflare.com/workers/platform/pricing)
- [Planetscale: FREE = 5 GB storage, 1 billion row reads/mo & 10 million row writes/mo](https://planetscale.com/pricing)
- [Prisma Data Platform: FREE = 3 million CPU ms/mo](https://www.prisma.io/pricing)
- [Sendgrid: FREE = 100 emails a day](https://sendgrid.com/pricing/)
- [Namecheap: $19.58 a year = Domain Registration](https://www.namecheap.com/domains/)
- [Github Team: $4 a month = 2G of storage](https://github.com/pricing)
- [Cloudflare Images: $5 a month = 100,000 images stored](https://www.cloudflare.com/products/cloudflare-images/)
- [Proton Business: $19.98 per month = 2 users w/ secure inboxes, calendars, & 1,000GB of cloud storage](https://proton.me/business/plans)


## Local install
1. [Install git](https://github.com/git-guides/install-git)
1. [Install node & npm](https://nodejs.org/en/download/)
1. [Install nvm](https://github.com/nvm-sh/nvm)
1. In [bash](https://opensource.com/resources/what-bash) navigate to the place you would love to place this code
```bash
git clone https://github.com/sensethenlove/sensethenlove.git
cd sensethenlove
nvm use 18
npm install -g pnpm
pnpm i
```

## Start development server
```bash
pnpm dev
```

## Deploy to live site
```bash
pnpm live
```

## Open [Prisma Studio](https://www.prisma.io/studio)
```bash
pnpm data
```

## How to update database schema

1. Update schema @ `./prisma/schema.prisma` & save the file w/ `datasource db` > `url` > `env("DEV_DATABASE_URL")`
1. Bash `pnpm push-dev-schema` to push schema changes to `dev` branch in [PlanetScale](https://planetscale.com/docs)
1. Click `DASHBOARD_PLANETSCALE` link in `.apps` file
1. Click `Branches` tab
1. Click `dev` link
1. Scroll to bottom of page
1. Select `Deploy to main`
1. Click `Create deploy request` button
1. Click `Deploy changes`
1. Before `git push` OR `pnpm live` save schema @ `./prisma/schema.prisma` w/ `datasource db` > `url` > `env("PRISMA_DATABASE_URL")`


## Format `schema.prisma` in [VSCodium](https://vscodium.com/) on save
Preferences > Settings > JSON
```json
{
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma",
    "editor.formatOnSave": true
  }
}
```

## Set default tab size in [VSCodium](https://vscodium.com/) to 2 for new files
Preferences > Settings > JSON
```json
{
  "editor.tabSize": 2
}
```

## Show what folder we are in @ the tab level of [VSCodium](https://vscodium.com/)
Preferences > Settings > JSON
```json
{
  "workbench.editor.labelFormat": "short"
}
```

## Stop [VSCodium](https://vscodium.com/) from compacting folders in sidenav
Preferences > Settings > JSON
```json
{
  "explorer.compactFolders": false
}
```

## Increase indent for sub folders in [VSCodium](https://vscodium.com/) sidenav
Preferences > Settings > JSON
```json
{
  "workbench.tree.indent": 18
}
```

## Get project wide typescript reporting in [VSCodium](https://vscodium.com/)
Preferences > Settings > JSON
```json
{
 "typescript.tsserver.experimental.enableProjectDiagnostics": true
}
```

## Show autocomplete suggestions in [VSCodium](https://vscodium.com/)
```
Control + Space
```

## Reload [VSCodium](https://vscodium.com/)
This is helpful when type definitions are stale (showing incorrect errors)
```
Command + Shift + P
Developer: Reload Window
```
