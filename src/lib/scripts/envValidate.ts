import fs from 'node:fs'
import envMap from './envMap.js'
import getPropertiesError from './getPropertiesError.js'


(async function main() {
  const map = envMap

  if (!map.has(process.argv[2])) throw getPropertiesError(process.argv[2], map)
  else {
    const PATH = '.env'
    const environment = process.argv[2]
    const text = await fs.promises.readFile(PATH, 'utf-8')
    const value = map.get(environment)
    const validateError = new Error('The .env file is not correct')

    if (!text.match(`PUBLIC_ENVIRONMENT = '${ environment }'`)) throw validateError
    if (!text.match(`PUBLIC_HOST = '${ value }'`)) throw validateError

    console.log('💚 Successfully validated .env file')
  }
})()
