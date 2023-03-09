#!/bin/bash
pnpm ts-node ./src/lib/scripts/gitBranchValidate.ts qa &&
pnpm qaWrite &&
pnpm prisma generate --data-proxy &&
pnpm check &&
pnpm vite build &&
pnpm wrangler publish --env qa
