#!/bin/bash
pnpm ts-node ./src/lib/scripts/prismaWrite.ts $db &&
node node_modules/@sensethenlove/env-write/lib/index.js PUBLIC_ENVIRONMENT=$env PUBLIC_HOST=$host
