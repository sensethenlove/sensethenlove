<script lang="ts">
  import { onMount } from 'svelte'
  import htmlSanitize from '$lib/util/htmlSanitize'
  import loopBackwards from '$lib/util/loopBackwards'
  import addHtmlToEditableDiv from '$lib/form/addHtmlToEditableDiv'
  import isContentEditableEmpty from '$lib/form/isContentEditableEmpty'
  import { BASE_CONTENT_EDITABLE_ELEMENT, EDITABLE_PRISTINE_ATTRIBUTE } from '$lib/form/variables'

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
    const pristineAdditions = editableDiv.querySelectorAll(`[${ EDITABLE_PRISTINE_ATTRIBUTE }]`)

    loopBackwards(Array.from(pristineAdditions), (item, splice) => {
      if (item.innerText !== item.getAttribute(EDITABLE_PRISTINE_ATTRIBUTE)) splice()
    })

    if (sanitizedTextarea && editableDiv && typeof editableDiv.textContent === 'string') {
      if (!isContentEditableEmpty(editableDiv.innerHTML)) sanitizedTextarea.value = htmlSanitize(editableDiv.innerHTML) // editable div is not empty so set sanitized text
      else { // editable div is empty
        sanitizedTextarea.value = '' // set sanitized to an empty string so validation knows it is blank
        editableDiv.innerHTML = BASE_CONTENT_EDITABLE_ELEMENT // set editable to base so insert tags works
      }
    }

    clearErrors() // stop showing errors if input happens
  }

  function addHashTag () {
    addHtmlToEditableDiv(editableDiv, onInput, () => {
      const anchor = document.createElement('a') // create an anchor element
      anchor.setAttribute(EDITABLE_PRISTINE_ATTRIBUTE, '#I AM')
      anchor.setAttribute('href', 'https://sensethenlove.com') // add href to the anchor element
      anchor.innerText = '#I AM' // add text to anchor element
      return anchor
    })
  }

  function addFriendTag () {
    addHtmlToEditableDiv(editableDiv, onInput, () => {
      const anchor = document.createElement('a') // create an anchor element
      anchor.setAttribute(EDITABLE_PRISTINE_ATTRIBUTE, '@Chris Carrington')
      anchor.setAttribute('href', 'https://sensethenlove.com') // add href to the anchor element
      anchor.innerText = '@Chris Carrington' // add text to anchor element
      return anchor
    })
  }

  onMount(() => { // reset sanitized & editable
    if (sanitizedTextarea) sanitizedTextarea.value = ''
    if (editableDiv) editableDiv.innerHTML = BASE_CONTENT_EDITABLE_ELEMENT
  })
</script>


<div class="above">
  <label for={ id }>{ label }</label>
  <div>
    <button class="brand" type="button" unselectable="on" on:click={ () => { addHashTag() } }>Add Hash Tag</button>
    <button class="brand" type="button" unselectable="on" on:click={ () => { addFriendTag() } }>Add Friend Tag</button>
  </div>
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
