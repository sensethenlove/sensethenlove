#!/bin/bash
pnpm ts-node ./src/lib/scripts/gitBranchValidate.ts main &&
pnpm mainWrite &&
pnpm prisma generate --data-proxy &&
pnpm check &&
pnpm vite build &&
pnpm wrangler publish
