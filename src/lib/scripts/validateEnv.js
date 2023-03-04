import fs from 'node:fs'
import envMap from './envMap.js'
import getPropertiesError from './getPropertiesError.js'


(async function main() {
  const map = envMap
  const propertiesError = getPropertiesError(map)

  if (!map.has(process.argv[2])) throw propertiesError
  else {
    const PATH = '.env'
    const environment = process.argv[2]
    const text = await fs.promises.readFile(PATH, 'utf-8')
    const value = map.get(environment)
    const validateError = new Error(`In bash run "${ value.write }" please`)

    if (!text.match(`PUBLIC_ENVIRONMENT = '${ environment }'`)) throw validateError
    if (!text.match(`PUBLIC_HOST = '${ value.host }'`)) throw validateError

    console.log('💚 Successfully validated .env file')
  }
})()
