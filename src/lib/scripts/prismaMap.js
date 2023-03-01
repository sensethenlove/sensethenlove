const qaValues = {
  schemaQA: '  url          = env("QA_PRISMA_DATABASE_URL")',
  schemaPROD: '  // url          = env("PROD_PRISMA_DATABASE_URL")',
  prismaLocalQA: '            url: QA_DATABASE_URL',
  prismaLocalProd: '            // url: PROD_DATABASE_URL',
  prismaElseQA: '          url: QA_PRISMA_DATABASE_URL',
  prismaElseProd: '          // url: PROD_PRISMA_DATABASE_URL'
}

const prodValues = {
  schemaQA: '  // url          = env("QA_PRISMA_DATABASE_URL")',
  schemaPROD: '  url          = env("PROD_PRISMA_DATABASE_URL")',
  prismaLocalQA: '            // url: QA_DATABASE_URL',
  prismaLocalProd: '            url: PROD_DATABASE_URL',
  prismaElseQA: '          // url: QA_PRISMA_DATABASE_URL',
  prismaElseProd: '          url: PROD_PRISMA_DATABASE_URL'
}

export default new Map([
  ['qa', qaValues],
  ['production', prodValues],
])
