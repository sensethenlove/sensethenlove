#!/bin/bash
# pnpm ts-node ./src/lib/scripts/writePrisma.ts qa &&
pnpm ts-node ./src/lib/scripts/writePrisma.ts production &&
pnpm ts-node ./src/lib/scripts/writeEnv.ts local
