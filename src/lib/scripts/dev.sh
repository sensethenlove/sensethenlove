#!/bin/bash
# env=local db=qaPlanetScale pnpm write &&
pnpm devWrite &&
pnpm prisma generate &&
pnpm vite dev
