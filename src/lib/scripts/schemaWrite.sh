#!/bin/bash
pnpm ts-node ./src/lib/scripts/writePrisma.ts schema
pnpm ts-node ./src/lib/scripts/writeEnv.ts qa
