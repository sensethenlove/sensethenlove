export default (map) => {
  return new Error(`Please pass one of the following properties ${[...map.keys()].join(', ')}`)
}
