#!/bin/bash
pnpm ts-node ./src/lib/scripts/gitBranchValidate.ts main &&
pnpm ts-node ./src/lib/scripts/prismaValidate.ts main &&
pnpm ts-node ./src/lib/scripts/envValidate.ts main &&
pnpm check &&
git push
