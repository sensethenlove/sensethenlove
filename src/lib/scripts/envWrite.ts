import fs from 'node:fs'
import envMap from './envMap.js'
import getPropertiesError from './getPropertiesError.js'


(async function main() {
  const map = envMap
  const environment = process.argv[2]

  if (!map.has(environment)) throw getPropertiesError(process.argv[2], map)
  else {
    const PATH = '.env'
    const text = await fs.promises.readFile(PATH, 'utf-8')
    const updated = text
      .replace(/PUBLIC_ENVIRONMENT.+/, `PUBLIC_ENVIRONMENT = '${ environment }'`)
      .replace(/PUBLIC_HOST.+/, `PUBLIC_HOST = '${ map.get(environment) }'`)

    await fs.promises.writeFile(PATH, updated)
    console.log('💚 Successfully updated .env file')
  }
})()
