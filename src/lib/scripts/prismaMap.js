const qaValues = {
  write: 'pnpm qa-write',
  schemaPlanetscaleQA: '  // url          = env("QA_DATABASE_URL")',
  schemaPlanetscalePROD: '  // url          = env("PROD_DATABASE_URL")',
  schemaPrismaQA: '  url          = env("QA_PRISMA_DATABASE_URL")',
  schemaPrismaPROD: '  // url          = env("PROD_PRISMA_DATABASE_URL")',
  prismaLocalQA: '            url: QA_DATABASE_URL',
  prismaLocalProd: '            // url: PROD_DATABASE_URL',
  prismaElseQA: '          url: QA_PRISMA_DATABASE_URL',
  prismaElseProd: '          // url: PROD_PRISMA_DATABASE_URL',
}

const prodValues = {
  write: 'pnpm prod-write',
  schemaPlanetscaleQA: '  // url          = env("QA_DATABASE_URL")',
  schemaPlanetscalePROD: '  // url          = env("PROD_DATABASE_URL")',
  schemaPrismaQA: '  // url          = env("QA_PRISMA_DATABASE_URL")',
  schemaPrismaPROD: '  url          = env("PROD_PRISMA_DATABASE_URL")',
  prismaLocalQA: '            // url: QA_DATABASE_URL',
  prismaLocalProd: '            url: PROD_DATABASE_URL',
  prismaElseQA: '          // url: QA_PRISMA_DATABASE_URL',
  prismaElseProd: '          url: PROD_PRISMA_DATABASE_URL',
}

export default new Map([
  ['qa', qaValues],
  ['production', prodValues],
])
