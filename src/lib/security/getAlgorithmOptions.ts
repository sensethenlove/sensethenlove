export default (isFor: 'sign' | 'verify' | 'generate' | 'import'): { name: string, namedCurve: string } | { name: string, hash: { name: string } } => {
  return (isFor === 'generate' || isFor === 'import') ?
    { name: 'ECDSA', namedCurve: 'P-521' } :
    { name: 'ECDSA', hash: { name: 'SHA-512' } }
}
