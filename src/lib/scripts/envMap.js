export default new Map([
  ['local', { host: 'http://localhost:5173', write: 'pnpm local-write' }],
  ['qa', { host: 'https://qa.sensethenlove.com', write: 'pnpm qa-local' }],
  ['production', { host: 'https://sensethenlove.com', write: 'pnpm prod-local' }],
])
