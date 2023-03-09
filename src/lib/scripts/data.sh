#!/bin/bash
pnpm ts-node ./src/lib/scripts/prismaWrite.ts $db
pnpm prisma generate &&
pnpm prisma studio
