import fs from 'node:fs'
import { argv } from 'node:process'


async function main () {
  if (argv.length !== 3) throw new Error('Please pass valid arguments')
  else {
    const env = argv[2]
    const PATH = './prisma/schema.prisma'
    const text = await fs.promises.readFile(PATH, 'utf-8')
    const correct = text.replace(/url.+/, `url          = env("${ env }")`)
    await fs.promises.writeFile(PATH, correct)
    console.log('💜 Successfully populated "./prisma/schema.prisma"')
  }
}


main()
