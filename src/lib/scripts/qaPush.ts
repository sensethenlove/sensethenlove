import bash from './bash.js'


const scripts = [
  'pnpm ts-node ./src/lib/scripts/validateGitBranch.ts qa',
  'pnpm ts-node ./src/lib/scripts/validatePrisma.ts qa',
  'pnpm ts-node ./src/lib/scripts/validateEnv.ts qa',
  'pnpm check',
  'git push'
]

bash(scripts.join(' && '))
