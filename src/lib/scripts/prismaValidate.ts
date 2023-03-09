import fs from 'node:fs'
import prismaMap from './prismaMap.js'
import getPropertiesError from './getPropertiesError.js'


(async function main() {
  const map = prismaMap

  if (!map.has(process.argv[2])) throw getPropertiesError(process.argv[2], map)
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
      schemaPrismaMAIN: false,
      schemaPlanetscaleQA: false,
      schemaPlanetscaleMAIN: false,
      prismaLocalQA: false,
      prismaLocalMain: false,
      prismaElseQA: false,
      prismaElseMain: false,
    }

    if (values) {
      for (const [i, line] of schemaLines.entries()) {
        if (line === values.schemaPrismaQA) found.schemaPrismaQA = true
        else if (line === values.schemaPrismaMAIN) found.schemaPrismaMAIN = true
        else if (line === values.schemaPlanetscaleQA) found.schemaPlanetscaleQA = true
        else if (line === values.schemaPlanetscaleMAIN) found.schemaPlanetscaleMAIN = true
      }

      for (const [i, line] of prismaLines.entries()) {
        if (line === values.prismaLocalQA) found.prismaLocalQA = true
        else if (line === values.prismaLocalMain) found.prismaLocalMain = true
        else if (line === values.prismaElseQA) found.prismaElseQA = true
        else if (line === values.prismaElseMain) found.prismaElseMain = true
      }

      if (!found.schemaPrismaQA || !found.schemaPrismaMAIN || !found.schemaPlanetscaleQA || !found.schemaPlanetscaleMAIN || !found.prismaLocalQA || !found.prismaLocalMain || !found.prismaElseQA || !found.prismaElseMain) {
        throw new Error('Prisma value(s) incorrect.')
      }
    }

    console.log(`💖 Successfully validated "${ SCHEMA_PATH }"`)
    console.log(`💜 Successfully validated "${ PRISMA_PATH }"`)
  }
})()
