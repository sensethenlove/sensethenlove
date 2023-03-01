import fs from 'node:fs'
import prismaMap from './prismaMap.js'


(async function main() {
  const map = prismaMap

  if (!map.has(process.argv[2])) throw new Error(`Please pass one of the following properties ${[...map.keys()].join(', ')}`)
  else {
    const SCHEMA_PATH = './prisma/schema.prisma'
    const schemaText = await fs.promises.readFile(SCHEMA_PATH, 'utf-8')
    const schemaLines = schemaText.split('\n')

    const PRISMA_PATH = './src/lib/prisma/prisma.ts'
    const prismaText = await fs.promises.readFile(PRISMA_PATH, 'utf-8')
    const prismaLines = prismaText.split('\n')

    const values = map.get(process.argv[2])

    const found = {
      schemaQA: false,
      schemaPROD: false,
      prismaLocalQA: false,
      prismaLocalProd: false,
      prismaElseQA: false,
      prismaElseProd: false,
    }

    if (values) {
      for (const [i, line] of schemaLines.entries()) {
        if (line === values.schemaQA) found.schemaQA = true
        else if (line === values.schemaPROD) found.schemaPROD = true
      }

      for (const [i, line] of prismaLines.entries()) {
        if (line === values.prismaLocalQA) found.prismaLocalQA = true
        else if (line === values.prismaLocalProd) found.prismaLocalProd = true
        else if (line === values.prismaElseQA) found.prismaElseQA = true
        else if (line === values.prismaElseProd) found.prismaElseProd = true
      }

      if (!found.schemaQA) throw new Error('Put this in the ' + SCHEMA_PATH + ' file please ' + values.schemaQA)
      if (!found.schemaPROD) throw new Error('Put this in the ' + SCHEMA_PATH + ' file please ' + values.schemaPROD)
      if (!found.prismaLocalQA) throw new Error('Put this in the ' + PRISMA_PATH + ' file please ' + values.prismaLocalQA)
      if (!found.prismaLocalProd) throw new Error('Put this in the ' + PRISMA_PATH + ' file please ' + values.prismaLocalProd)
      if (!found.prismaElseQA) throw new Error('Put this in the ' + PRISMA_PATH + ' file please ' + values.prismaElseQA)
      if (!found.prismaElseProd) throw new Error('Put this in the ' + PRISMA_PATH + ' file please ' + values.prismaElseProd)
    }

    console.log(`💜 Successfully updated "${ SCHEMA_PATH }" AND "${ PRISMA_PATH }"`)
  }
})()
