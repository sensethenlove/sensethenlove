import bash from './bash.js'


const scripts = [
  'pnpm ts-node ./src/lib/scripts/writePrisma.ts qa',
  'pnpm ts-node ./src/lib/scripts/writeEnv.ts local'
]

bash(scripts.join(' && '))
