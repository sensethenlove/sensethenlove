#!/bin/bash
env=qa db=qaPlanetScale pnpm write &&
pnpm prisma db push
