export default (property: string, map: Map<string, any>) => {
  return new Error(`Got "${ property }". Please pass one of the following properties ${[...map.keys()].join(', ')}`)
}
