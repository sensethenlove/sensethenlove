const qaPrismaValues = {
  schemaPlanetscaleQA: '  // url          = env("QA_PLANETSCALE_URL")',
  schemaPlanetscaleMAIN: '  // url          = env("MAIN_PLANETSCALE_URL")',
  schemaPrismaQA: '  url          = env("QA_PRISMA_URL")',
  schemaPrismaMAIN: '  // url          = env("MAIN_PRISMA_URL")',
  prismaLocalQA: '            url: QA_PLANETSCALE_URL',
  prismaLocalMain: '            // url: MAIN_PLANETSCALE_URL',
  prismaElseQA: '          url: QA_PRISMA_URL',
  prismaElseMain: '          // url: MAIN_PRISMA_URL',
}

const qaPlanetScaleValues = {
  schemaPlanetscaleQA: '  url          = env("QA_PLANETSCALE_URL")',
  schemaPlanetscaleMAIN: '  // url          = env("MAIN_PLANETSCALE_URL")',
  schemaPrismaQA: '  // url          = env("QA_PRISMA_URL")',
  schemaPrismaMAIN: '  // url          = env("MAIN_PRISMA_URL")',
  prismaLocalQA: '            url: QA_PLANETSCALE_URL',
  prismaLocalMain: '            // url: MAIN_PLANETSCALE_URL',
  prismaElseQA: '          url: QA_PRISMA_URL',
  prismaElseMain: '          // url: MAIN_PRISMA_URL',
}

const mainPrismaValues = {
  schemaPlanetscaleQA: '  // url          = env("QA_PLANETSCALE_URL")',
  schemaPlanetscaleMAIN: '  // url          = env("MAIN_PLANETSCALE_URL")',
  schemaPrismaQA: '  // url          = env("QA_PRISMA_URL")',
  schemaPrismaMAIN: '  url          = env("MAIN_PRISMA_URL")',
  prismaLocalQA: '            // url: QA_PLANETSCALE_URL',
  prismaLocalMain: '            url: MAIN_PLANETSCALE_URL',
  prismaElseQA: '          // url: QA_PRISMA_URL',
  prismaElseMain: '          url: MAIN_PRISMA_URL',
}

const mainPlanetScaleValues = {
  schemaPlanetscaleQA: '  // url          = env("QA_PLANETSCALE_URL")',
  schemaPlanetscaleMAIN: '  url          = env("MAIN_PLANETSCALE_URL")',
  schemaPrismaQA: '  // url          = env("QA_PRISMA_URL")',
  schemaPrismaMAIN: '  // url          = env("MAIN_PRISMA_URL")',
  prismaLocalQA: '            // url: QA_PLANETSCALE_URL',
  prismaLocalMain: '            url: MAIN_PLANETSCALE_URL',
  prismaElseQA: '          // url: QA_PRISMA_URL',
  prismaElseMain: '          url: MAIN_PRISMA_URL',
}

export default new Map([
  ['qaPrisma', qaPrismaValues],
  ['qaPlanetScale', qaPlanetScaleValues],
  ['mainPrisma', mainPrismaValues],
  ['mainPlanetScale', mainPlanetScaleValues],
])
