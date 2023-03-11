const emptyOptions = [
  '',
  '<br>',
  '<br />',
]


export default (content: string) => {
  return emptyOptions.includes(content)
}
