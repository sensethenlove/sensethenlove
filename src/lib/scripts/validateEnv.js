import fs from 'node:fs'
import envMap from './envMap.js'


(async function main() {
  const map = envMap

  if (!map.has(process.argv[2])) throw new Error(`Please pass one of the following properties ${[...map.keys()].join(', ')}`)
  else {
    const PATH = '.env'
    const environment = process.argv[2]
    const text = await fs.promises.readFile(PATH, 'utf-8')
    const value = map.get(environment)

    if (!text.match(`PUBLIC_ENVIRONMENT = '${ environment }'`)) throw new Error(`In the terminal run ${ value.write }`)
    if (!text.match(`PUBLIC_HOST = '${ value.host }'`)) throw new Error(`In the terminal run ${ value.write }`)

    console.log('💚 Successfully validated .env file')
  }
})()
