import isContentEditableEmpty from '$lib/form/isContentEditableEmpty'


export default (editableDiv: HTMLDivElement, onInput: () => void, node: string): void => {
  const content = editableDiv.innerHTML

  if (content.endsWith('<br>')) insertBeforeBreak(content, editableDiv, node, 4)
  else if (content.endsWith('<br></div>')) insertBeforeBreak(content, editableDiv, node, 10)
  else if (isContentEditableEmpty(content)) editableDiv.innerHTML = node
  else editableDiv.innerHTML += ` ${ node }`

  onInput()
}


function insertBeforeBreak (content: string, editableDiv: HTMLDivElement, node: string, skipLength: number) {
  const length = content.length
  const position = length - skipLength
  editableDiv.innerHTML = content.substring(0, position) + ` ${ node }` + content.substring(position)
}