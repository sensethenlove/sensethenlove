#!/bin/bash
pnpm ts-node ./src/lib/scripts/validateGitBranch.ts main
pnpm ts-node ./src/lib/scripts/validatePrisma.ts production
pnpm ts-node ./src/lib/scripts/validateEnv.ts production
pnpm check
git push
