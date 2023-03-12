import isContentEditableEmpty from '$lib/form/isContentEditableEmpty'


export default (editableDiv: HTMLDivElement, onInput: () => void, node: HTMLElement): void => {
  const content = editableDiv.innerHTML

  if (content.endsWith('<br>')) insertBeforeBreak(content, editableDiv, node, 4)
  else if (content.endsWith('<br></div>')) insertBeforeBreak(content, editableDiv, node, 10)
  else if (isContentEditableEmpty(content)) editableDiv.appendChild(node)
  else {
    const space = document.createTextNode(' ')
    editableDiv.appendChild(space)
    editableDiv.appendChild(node)
  }

  onInput()
}


function insertBeforeBreak (content: string, editableDiv: HTMLDivElement, node: HTMLElement, skipLength: number) {
  const length = content.length
  const position = length - skipLength
  editableDiv.innerHTML = content.substring(0, position) + ` ${ node.innerHTML }` + content.substring(position)
}
