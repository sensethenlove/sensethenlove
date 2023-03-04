export default new Map([
  ['local', { host: 'http://localhost:5173', write: 'pnpm localWrite' }],
  ['qa', { host: 'https://qa.sensethenlove.com', write: 'pnpm qaWrite' }],
  ['production', { host: 'https://sensethenlove.com', write: 'pnpm prodWrite' }],
])
