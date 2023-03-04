import bash from './bash.js'


const scripts = [
  'pnpm ts-node ./src/lib/scripts/writePrisma.ts production',
  'pnpm ts-node ./src/lib/scripts/writeEnv.ts production'
]

bash(scripts.join(' && '))
