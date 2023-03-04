#!/bin/bash
pnpm localWrite &&
pnpm prisma generate &&
vite dev
