# Sense Then Love

## Helpful links
##### Docs
- [Svelte](https://svelte.dev/docs)
- [Svelte Kit](https://kit.svelte.dev/docs/introduction)
- [Prisma](https://www.prisma.io/docs)
- [Prisma Client](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Prisma Schema](https://www.prisma.io/docs/concepts/components/prisma-schema)
- [Prisma Indexes](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode#indexes)
- [PlanetScale](https://planetscale.com/docs)
- [Turnstile](https://developers.cloudflare.com/turnstile/)
- [Markdown](https://www.markdownguide.org/basic-syntax)
- [Open Graph](https://ogp.me/)

##### Code Examples
- [Sveltekit + Prisma](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-sveltekit)
- [Sveltekit + Turnstile](https://github.com/ghostdevv/svelte-turnstile)
- [Sveltekit Authentication](https://github.com/huntabyte/sveltekit-protected-routes/tree/final-code)

##### Videos
- [Learn Prisma In 60 Minutes](https://www.youtube.com/watch?v=RebA5J-rlwg)
- [Prisma & PlanetScale Best Practices](https://www.youtube.com/watch?v=iaHt5_hg44c)
- [MySQL Scaling Made Easy](https://planetscale.com/events/mysql-scaling-made-easy/thank-you) 

##### Articles
- [Prisma + NextJS](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)
- [Using Prisma with Planetscale](https://www.prisma.io/docs/guides/database/using-prisma-with-planetscale)

##### Utilities
- [Squoosh](https://squoosh.app)
- [SVG Icons](https://icones.js.org/collection/all)
- [Flowbite](https://flowbite-svelte.com/)

## Set Node Version
```bash
nvm use 18
```

## Developing
```bash
npm install
npm run dev
```

## Deploy to production
```bash
git checkout main
git push
```

## Generate new prisma client
This is useful after changes have been made to `schema.prisma`
```bash
npx prisma generate
```

## Open prisma studio
```bash
npx prisma studio
```

## Sync local schema with cloud schema
```bash
npx prisma db push
```

## How to update database schema
1. Update value to `env("DEV_DATABASE_URL")` @ `./prisma/schema.prisma` > `datasource db` > `url`
1. Save `./prisma/schema.prisma` file
1. Bash `npx prisma db generate` to point to dev database
1. Make schema update in `./prisma/schema.prisma`
1. Bash `npx prisma db push` to deploy schema changes to `dev` branch
1. Click `DASHBOARD_PLANETSCALE` link in `.env` file
1. Click `Branches` tab
1. Click `dev` link
1. Scroll to bottom of page
1. Select `Deploy to main`
1. Click `Create deploy request` button
1. Click `Deploy changes`
1. Wait for changes to finish
1. Update value to `env("PROD_DATABASE_URL")` @ `./prisma/schema.prisma` > `datasource db` > `url`
1. Save `./prisma/schema.prisma` file
1. Bash `npx prisma db generate` to point to prod database
1. Bash > `npx prisma studio` to see changes in browser


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
