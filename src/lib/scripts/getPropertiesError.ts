export default (map: Map<string, any>) => {
  return new Error(`Please pass one of the following properties ${[...map.keys()].join(', ')}`)
}
