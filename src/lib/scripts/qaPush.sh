#!/bin/bash
pnpm ts-node ./src/lib/scripts/validateGitBranch.ts qa
pnpm ts-node ./src/lib/scripts/validatePrisma.ts qa
pnpm ts-node ./src/lib/scripts/validateEnv.ts qa
pnpm check
git push
