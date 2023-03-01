const qaValues = {
  write: 'pnpm qa-write',
  schemaPlanetscaleQA: '  // url          = env("QA_PLANETSCALE_URL")',
  schemaPlanetscalePROD: '  // url          = env("PROD_PLANETSCALE_URL")',
  schemaPrismaQA: '  url          = env("QA_PRISMA_URL")',
  schemaPrismaPROD: '  // url          = env("PROD_PRISMA_URL")',
  prismaLocalQA: '            url: QA_PLANETSCALE_URL',
  prismaLocalProd: '            // url: PROD_PLANETSCALE_URL',
  prismaElseQA: '          url: QA_PRISMA_URL',
  prismaElseProd: '          // url: PROD_PRISMA_URL',
}

const prodValues = {
  write: 'pnpm prod-write',
  schemaPlanetscaleQA: '  // url          = env("QA_PLANETSCALE_URL")',
  schemaPlanetscalePROD: '  // url          = env("PROD_PLANETSCALE_URL")',
  schemaPrismaQA: '  // url          = env("QA_PRISMA_URL")',
  schemaPrismaPROD: '  url          = env("PROD_PRISMA_URL")',
  prismaLocalQA: '            // url: QA_PLANETSCALE_URL',
  prismaLocalProd: '            url: PROD_PLANETSCALE_URL',
  prismaElseQA: '          // url: QA_PRISMA_URL',
  prismaElseProd: '          url: PROD_PRISMA_URL',
}

export default new Map([
  ['qa', qaValues],
  ['production', prodValues],
])
