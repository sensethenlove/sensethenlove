import fs from 'node:fs'


(async function main() {
  const PATH = './prisma/schema.prisma'
  const text = await fs.promises.readFile(PATH, 'utf-8')
  if (!text.match(/[\r\n]+\s\surl\s +=\senv\("PRISMA_DATABASE_URL"\)/)) throw new Error('Please set ./prisma/schema.prisma > datasource db > url to env("PRISMA_DATABASE_URL") before pushing to Github')
  console.log('💜 Successfully validated "./prisma/schema.prisma"')
})()
