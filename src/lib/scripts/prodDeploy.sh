pnpm ts-node ./src/lib/scripts/validateGitBranch.ts main
pnpm prodWrite
pnpm prisma generate --data-proxy
pnpm check
pnpm vite build
pnpm wrangler publish
