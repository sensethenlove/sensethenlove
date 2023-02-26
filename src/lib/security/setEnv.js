import fs from 'node:fs'


(async function main () {
  const envs = new Map([
    ['local',      'http://localhost:5173'],
    ['qa',         'https://qa.sensethenlove.com'],
    ['production', 'https://sensethenlove.com'],
  ])

  if (!envs.has(process.argv[2])) throw new Error(`Please pass one of the following properties ${ [...envs.keys()].join(', ') }`)
  else {
    const PATH = '.env'
    const text = await fs.promises.readFile(PATH, 'utf-8')
    const updated = text
      .replace(/PUBLIC_ENVIRONMENT.+/, `PUBLIC_ENVIRONMENT = '${ process.argv[2] }'`)
      .replace(/PUBLIC_HOST.+/, `PUBLIC_HOST = '${ envs.get(process.argv[2]) }'`)
    await fs.promises.writeFile(PATH, updated)
    console.log('💚 Successfully updated .env file')
  }
})()
