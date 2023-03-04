import bash from './bash.js'


const scripts = [
  'pnpm localWrite',
  'pnpm prisma generate',
  'vite dev'
]

bash(scripts.join(' && '))
