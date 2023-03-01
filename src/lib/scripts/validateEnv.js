import fs from 'node:fs'
import envMap from './envMap.js'


(async function main() {
  const map = envMap

  if (!map.has(process.argv[2])) throw new Error(`Please pass one of the following properties ${[...map.keys()].join(', ')}`)
  else {
    const PATH = '.env'
    const environment = process.argv[2]
    const text = await fs.promises.readFile(PATH, 'utf-8')

    if (!text.match(`PUBLIC_ENVIRONMENT = '${ environment}'`)) throw new Error(`Put this in the .env file please PUBLIC_ENVIRONMENT = '${ environment }'`)
    if (!text.match(`PUBLIC_HOST = '${ map.get(environment) }'`)) throw new Error(`Put this in the .env file please PUBLIC_HOST = '${ map.get(environment) }'`)

    console.log('💚 Successfully updated .env file')
  }
})()
