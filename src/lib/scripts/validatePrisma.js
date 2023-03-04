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

    const found = {
      schemaPrismaQA: false,
      schemaPrismaPROD: false,
      schemaPlanetscaleQA: false,
      schemaPlanetscalePROD: false,
      prismaLocalQA: false,
      prismaLocalProd: false,
      prismaElseQA: false,
      prismaElseProd: false,
    }

    if (values) {
      for (const [i, line] of schemaLines.entries()) {
        if (line === values.schemaPrismaQA) found.schemaPrismaQA = true
        else if (line === values.schemaPrismaPROD) found.schemaPrismaPROD = true
        else if (line === values.schemaPlanetscaleQA) found.schemaPlanetscaleQA = true
        else if (line === values.schemaPlanetscalePROD) found.schemaPlanetscalePROD = true
      }

      for (const [i, line] of prismaLines.entries()) {
        if (line === values.prismaLocalQA) found.prismaLocalQA = true
        else if (line === values.prismaLocalProd) found.prismaLocalProd = true
        else if (line === values.prismaElseQA) found.prismaElseQA = true
        else if (line === values.prismaElseProd) found.prismaElseProd = true
      }

      if (!found.schemaPrismaQA || !found.schemaPrismaPROD || !found.schemaPlanetscaleQA || !found.schemaPlanetscalePROD || !found.prismaLocalQA || !found.prismaLocalProd || !found.prismaElseQA || !found.prismaElseProd) {
        const validationError = new Error(`In the terminal run "${values.write}"`)
        throw validationError
      }
    }

    console.log(`💖 Successfully validated "${ SCHEMA_PATH }"`)
    console.log(`💜 Successfully validated "${ PRISMA_PATH }"`)
  }
})()
