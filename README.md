# Sense Then Love

## Helpful links
#### Documentation
- [Svelte](https://svelte.dev/docs)
- [SvelteKit](https://kit.svelte.dev/docs/introduction)
- [SvelteKit SVG](https://www.npmjs.com/package/@poppanator/sveltekit-svg)
- [Svelte Code Checker](https://www.npmjs.com/package/svelte-check)
- [Prisma](https://www.prisma.io/docs)
- [Prisma Data Platform](https://www.prisma.io/docs/data-platform)
- [Prisma Client](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Prisma Schema](https://www.prisma.io/docs/concepts/components/prisma-schema)
- [PlanetScale](https://planetscale.com/docs)
- [Cloudflare Workers](https://kit.svelte.dev/docs/adapter-cloudflare-workers)
- [Cloudflare Images](https://developers.cloudflare.com/images/)
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)
- [Zod](https://zod.dev/)
- [Sass](https://sass-lang.com/documentation/)
- [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)
- [PNPM](https://pnpm.io/motivation)
- [Sendgrid](https://github.com/sendgrid/sendgrid-nodejs)
- [Buffer](https://www.npmjs.com/package/buffer)
- [Vite](https://vitejs.dev/)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- [Typescript](https://www.npmjs.com/package/typescript)
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
- [NPM to PNPM](https://britishgeologicalsurvey.github.io/development/migrating-from-npm-to-pnpm/)
- [Cloudflare Worker Explanation](https://developers.cloudflare.com/workers/learning/how-workers-works)
- [Sveltekit + Sass](https://blog.hao.dev/how-to-add-scss-or-sass-to-sveltekit)
- [Cloudflare Global Network](https://www.cloudflare.com/network/)

#### Videos
- [Learn Prisma In 60 Minutes](https://www.youtube.com/watch?v=RebA5J-rlwg)
- [Prisma & PlanetScale Best Practices](https://www.youtube.com/watch?v=iaHt5_hg44c)
- [MySQL Scaling Made Easy](https://planetscale.com/events/mysql-scaling-made-easy/thank-you)

#### Utilities
- [Squoosh](https://squoosh.app)
- [SVG Icons](https://icones.js.org/collection/all)
- [Flowbite](https://flowbite-svelte.com/)
- [Jwt.io](https://jwt.io/)
- [Grey Shade](https://www.htmlcolor-picker.com/color-groups/white-grey-black)

#### Pricing
- [Namecheap: $19.58 a year for Domain Registration](https://www.namecheap.com/domains/)
- [Github Team: $4 a month for 2G of storage](https://github.com/pricing)
- [Cloudflare Workers: $5 a month for 10 million requests a month](https://developers.cloudflare.com/workers/platform/pricing)
- [Cloudflare Images: $5 a month for 100,000 images stored](https://www.cloudflare.com/products/cloudflare-images/)
- [Sendgrid: $19.95 a month for 50,000 emails sent a month](https://sendgrid.com/pricing/)
- [Proton Business: $19.98 a month for 2 users w/ secure inboxes, calendars, & 1,000GB of cloud storage](https://proton.me/business/plans)
- [Prisma Data Platform: $29 a month for 500 CPU minutes a month](https://www.prisma.io/pricing)
- [Planetscale: $29 a month for 10 GB storage, 50 million row writes/mo & 100 billion row reads/mo](https://planetscale.com/pricing)


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

## Validate code & then push to [Github](https://github.com/sensethenlove/sensethenlove)
```bash
pnpm git
```

## Open [Prisma Studio](https://www.prisma.io/studio)
1. Save schema @ `./prisma/schema.prisma` > `datasource db` > `url` w/ `env("DEV_DATABASE_URL")` or `env("PROD_DATABASE_URL")`
```bash
pnpm data
```

## How to update database schema

1. Update schema @ `./prisma/schema.prisma` & save the file w/ `datasource db` > `url` > `env("DEV_DATABASE_URL")`
1. Bash `pnpm push-schema` to push schema changes to `dev` branch in [PlanetScale](https://planetscale.com/docs)
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
