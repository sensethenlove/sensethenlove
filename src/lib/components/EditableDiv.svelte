<script lang="ts">
  import { onMount } from 'svelte'
  import htmlSanitize from '$lib/util/htmlSanitize'
  import { BASE_CONTENT_EDITABLE_ELEMENT } from '$lib/form/variables'
  import isContentEditableEmpty from '$lib/form/isContentEditableEmpty'

  export let id: string
  export let name: string
  export let label: string
  export let resetCounter: number
  export let clearErrors: () => void

  let editableDiv: HTMLDivElement
  let sanitizedTextarea: HTMLTextAreaElement

  $: if (resetCounter) { // Form.svelte letting us know the form has be reset
    editableDiv.innerHTML = BASE_CONTENT_EDITABLE_ELEMENT // set editable to base so insert tags works
  }

  function onInput () {
    if (sanitizedTextarea && editableDiv && typeof editableDiv.textContent === 'string') {
      if (!isContentEditableEmpty(editableDiv.innerHTML)) sanitizedTextarea.value = htmlSanitize(editableDiv.innerHTML) // editable div is not empty so set sanitized text
      else { // editable div is empty
        sanitizedTextarea.value = '' // set sanitized to an empty string so validation knows it is blank
        editableDiv.innerHTML = BASE_CONTENT_EDITABLE_ELEMENT // set editable to base so insert tags works
      }
    }

    clearErrors() // stop showing errors if input happens
  }

  function addTag () {
    const selection = window.getSelection() // find out where the users current focus is

    // if selection has been found and it is on the editable div or in the editale div
    if (selection?.getRangeAt && selection?.rangeCount && (editableDiv.contains(selection.focusNode) || selection.focusNode instanceof HTMLDivElement && selection.focusNode.classList.contains('editable-div'))) {
      const range = selection.getRangeAt(0) // get the users selection
      const anchor = document.createElement('a') // create an anchor element
      anchor.setAttribute('href', 'https://sensethenlove.com') // add link to the anchor element
      anchor.innerText = '@Chris Carrington' // add text to anchor element
      range.insertNode(anchor) // add anchor element where the user has selected
    } else { // if focus was not in editable div pre tag request
      const content = editableDiv.innerHTML
      const tag = '<a href="https://sensethenlove.com">@Chris Carrington</a>'

      if (content.endsWith('<br></div>')) { // if editable div ends with a break and a closing div we'd like to put the tag between the break and div (so not on a new line)
        const length = content.length
        const position = length - 10
        editableDiv.innerHTML = content.substring(0, position) + ` ${ tag }` + content.substring(position)
      } else if (!isContentEditableEmpty(content)) { // content is not empty
        editableDiv.innerHTML += ` ${ tag }` // put tag @ end
      } else { // tag becomes it all b/c there is nothing else here
        editableDiv.innerHTML = tag
      }
    }

    onInput()
  }

  onMount(() => { // reset sanitized & editable
    if (sanitizedTextarea) sanitizedTextarea.value = ''
    if (editableDiv) editableDiv.innerHTML = BASE_CONTENT_EDITABLE_ELEMENT
  })
</script>


<div class="above">
  <label for={ id }>{ label }</label>
  <button class="brand" type="button" unselectable="on" on:click={ () => { addTag() } }>Tag Friend in Post</button>
</div>

<div on:input={ () => { onInput() } } bind:this={ editableDiv } contenteditable="true" class="editable-div"><div></div></div>
<textarea { id } { name } aria-hidden="true" bind:this={ sanitizedTextarea }></textarea>


<style lang="scss">
  textarea {
    display: none;
  }

  button {
    padding: 0.3rem 0.9rem;
  }

  .above {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 0.6rem;

    label {
      margin: 0;
    }

    button {
      margin: 0;
    }
  }
</style>
