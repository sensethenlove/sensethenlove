#!/bin/bash
pnpm ts-node ./src/lib/scripts/gitBranchValidate.ts qa &&
pnpm ts-node ./src/lib/scripts/prismaValidate.ts qaPrisma &&
pnpm ts-node ./src/lib/scripts/envValidate.ts qa &&
pnpm check &&
git push
