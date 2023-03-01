import fs from 'node:fs'
import envMap from './envMap.js'


(async function main() {
  const map = envMap

  if (!map.has(process.argv[2])) throw new Error(`Please pass one of the following properties ${[...map.keys()].join(', ')}`)
  else {
    const PATH = '.env'
    const environment = process.argv[2]
    const text = await fs.promises.readFile(PATH, 'utf-8')

    const updated = text
      .replace(/PUBLIC_ENVIRONMENT.+/, `PUBLIC_ENVIRONMENT = '${ environment }'`)
      .replace(/PUBLIC_HOST.+/, `PUBLIC_HOST = '${ map.get(environment).host }'`)

    await fs.promises.writeFile(PATH, updated)
    console.log('💚 Successfully updated .env file')
  }
})()
