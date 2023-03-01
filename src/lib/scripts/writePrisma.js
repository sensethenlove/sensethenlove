import fs from 'node:fs'
import prismaMap from './prismaMap.js'


(async function main() {
  const map = prismaMap

  if (!map.has(process.argv[2])) throw new Error(`Please pass one of the following properties ${[...map.keys() ].join(', ') }`)
  else {
    const SCHEMA_PATH = './prisma/schema.prisma'
    const schemaText = await fs.promises.readFile(SCHEMA_PATH, 'utf-8')
    const schemaLines = schemaText.split('\n')

    const PRISMA_PATH = './src/lib/prisma/prisma.ts'
    const prismaText = await fs.promises.readFile(PRISMA_PATH, 'utf-8')
    const prismaLines = prismaText.split('\n')

    const values = map.get(process.argv[2])

    if (values) {
      for (const [i, line] of schemaLines.entries()) {
        if (line.match('QA_PRISMA_DATABASE_URL')) schemaLines[i] = values.schemaQA
        else if (line.match('PROD_PRISMA_DATABASE_URL')) schemaLines[i] = values.schemaPROD
      }

      for (const [i, line] of prismaLines.entries()) {
        if (line.match('url: QA_DATABASE_URL')) prismaLines[i] = values.prismaLocalQA
        else if (line.match('url: PROD_DATABASE_URL')) prismaLines[i] = values.prismaLocalProd
        else if (line.match('url: QA_PRISMA_DATABASE_URL')) prismaLines[i] = values.prismaElseQA
        else if (line.match('url: PROD_PRISMA_DATABASE_URL')) prismaLines[i] = values.prismaElseProd
      }
    }

    await Promise.all([
      fs.promises.writeFile(SCHEMA_PATH, schemaLines.join('\n')),
      fs.promises.writeFile(PRISMA_PATH, prismaLines.join('\n'))
    ])

    console.log(`💜 Successfully updated "${ SCHEMA_PATH }" AND "${ PRISMA_PATH }"`)
  }
})()
