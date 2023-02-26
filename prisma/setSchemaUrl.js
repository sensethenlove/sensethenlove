import fs from 'node:fs'


(async function main() {
  const point = new Map([
    ['PRISMA_DATABASE_URL', { prisma: '  url          = env("PRISMA_DATABASE_URL")',    dev: '  // url          = env("QA_DATABASE_URL")', prod: '  // url          = env("PROD_DATABASE_URL")' }],
    ['QA_DATABASE_URL', {    prisma: '  // url          = env("PRISMA_DATABASE_URL")', dev: '  url          = env("QA_DATABASE_URL")',    prod: '  // url          = env("PROD_DATABASE_URL")' }],
    ['PROD_DATABASE_URL', {   prisma: '  // url          = env("PRISMA_DATABASE_URL")', dev: '  // url          = env("QA_DATABASE_URL")',    prod: '  url          = env("PROD_DATABASE_URL")' }],
  ])

  if (!point.has(process.argv[2])) throw new Error(`Please pass one of the following properties ${ [ ...point.keys() ].join(', ') }`)
  else {
    const PATH = './prisma/schema.prisma'
    const text = await fs.promises.readFile(PATH, 'utf-8')
    const lines = text.split('\n')
    const values = point.get(process.argv[2])

    for (const [i, line] of lines.entries()) {
      if (line.match('PRISMA_DATABASE_URL')) lines[i] = values.prisma
      else if (line.match('QA_DATABASE_URL')) lines[i] = values.dev
      else if (line.match('PROD_DATABASE_URL')) lines[i] = values.prod
    }

    await fs.promises.writeFile(PATH, lines.join('\n'))
    console.log('💜 Successfully updated "./prisma/schema.prisma"')
  }
})()
