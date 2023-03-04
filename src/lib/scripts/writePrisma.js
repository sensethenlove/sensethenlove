import fs from 'node:fs'
import prismaMap from './prismaMap.js'
import getPropertiesError from './getPropertiesError.js'


(async function main() {
  const map = prismaMap
  const propertiesError = getPropertiesError(map)

  if (!map.has(process.argv[2])) throw propertiesError
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
        if (line.match('QA_PRISMA_URL')) schemaLines[i] = values.schemaPrismaQA
        else if (line.match('PROD_PRISMA_URL')) schemaLines[i] = values.schemaPrismaPROD
        else if (line.match('QA_PLANETSCALE_URL')) schemaLines[i] = values.schemaPlanetscaleQA
        else if (line.match('PROD_PLANETSCALE_URL')) schemaLines[i] = values.schemaPlanetscalePROD
      }

      for (const [i, line] of prismaLines.entries()) {
        if (line.match('url: QA_PLANETSCALE_URL')) prismaLines[i] = values.prismaLocalQA
        else if (line.match('url: PROD_PLANETSCALE_URL')) prismaLines[i] = values.prismaLocalProd
        else if (line.match('url: QA_PRISMA_URL')) prismaLines[i] = values.prismaElseQA
        else if (line.match('url: PROD_PRISMA_URL')) prismaLines[i] = values.prismaElseProd
      }
    }

    await Promise.all([
      fs.promises.writeFile(SCHEMA_PATH, schemaLines.join('\n')),
      fs.promises.writeFile(PRISMA_PATH, prismaLines.join('\n'))
    ])

    console.log(`💖 Successfully updated "${ SCHEMA_PATH }""`)
    console.log(`💜 Successfully updated "${ PRISMA_PATH }"`)
  }
})()
