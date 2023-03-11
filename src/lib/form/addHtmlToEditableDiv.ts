import isContentEditableEmpty from '$lib/form/isContentEditableEmpty'


export default (editableDiv: HTMLDivElement, onInput: () => void, getNode: () => HTMLAnchorElement): void => {
  const selection = window.getSelection() // find out where the users current focus is

  // if selection has been found and it is on the editable div or in the editale div
  if (selection?.getRangeAt && selection?.rangeCount && (editableDiv.contains(selection.focusNode) || selection.focusNode instanceof HTMLDivElement && selection.focusNode.classList.contains('editable-div'))) {
    const range = selection.getRangeAt(0) // get the users selection
    range.insertNode(getNode()) // add anchor element where the user has selected
  } else { // if focus was not in editable div pre tag request
    const anchor = getNode().outerHTML // node as a string
    const content = editableDiv.innerHTML // html string in editable div

    if (content.endsWith('<br></div>')) { // if editable div ends with a break and a closing div we'd like to put the tag between the break and div (so not on a new line)
      const length = content.length
      const position = length - 10
      editableDiv.innerHTML = content.substring(0, position) + ` ${ anchor }` + content.substring(position)
    } else if (!isContentEditableEmpty(content)) { // content is not empty
      editableDiv.innerHTML += ` ${ anchor }` // put tag @ end
    } else { // tag becomes it all b/c there is nothing else here
      editableDiv.innerHTML = anchor
    }
  }

  onInput()
}
