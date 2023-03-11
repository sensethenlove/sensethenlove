<script lang="ts">
  import { onMount } from 'svelte'
  import Modal from '$lib/components/Modal.svelte'
  import htmlSanitize from '$lib/util/htmlSanitize'
  import loopBackwards from '$lib/util/loopBackwards'
  import type { ShowModal, HideModal } from '$lib/types/all'
  import addHtmlToEditableDiv from '$lib/form/addHtmlToEditableDiv'
  import isContentEditableEmpty from '$lib/form/isContentEditableEmpty'
  import { BASE_CONTENT_EDITABLE_ELEMENT, EDITABLE_PRISTINE_ATTRIBUTE } from '$lib/form/variables'

  export let id: string
  export let name: string
  export let label: string
  export let resetCounter: number
  export let clearErrors: () => void

  let showModal: ShowModal
  let hideModal: HideModal
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
      if (!isContentEditableEmpty(editableDiv.innerHTML)) sanitizedTextarea.value = htmlSanitize(editableDiv.innerHTML.replace(BASE_CONTENT_EDITABLE_ELEMENT, '')) // editable div is not empty so set sanitized text
      else { // editable div is empty
        sanitizedTextarea.value = '' // set sanitized to an empty string so validation knows it is blank
        editableDiv.innerHTML = BASE_CONTENT_EDITABLE_ELEMENT // set editable to base so insert tags works
      }
    }

    clearErrors() // stop showing errors if input happens
  }

  function addLink (href: string, text: string, isBlank?: boolean) {
    addHtmlToEditableDiv(editableDiv, onInput, `<a href="${ href }" ${ EDITABLE_PRISTINE_ATTRIBUTE }="${ text }" ${ isBlank ? 'target="_blank"' : '' }>${ text }</a>`)
  }

  function bindModalFunctions (e: CustomEvent) {
    showModal = e.detail.showModal
    hideModal = e.detail.hideModal
  }

  onMount(() => { // reset sanitized & editable
    if (sanitizedTextarea) sanitizedTextarea.value = ''
    if (editableDiv) editableDiv.innerHTML = BASE_CONTENT_EDITABLE_ELEMENT
  })
</script>


<div class="above">
  <label for={ id }>{ label }</label>
  <button class="brand" type="button" on:click={ showModal }>+</button>
</div>

<div on:input={ () => { onInput() } } bind:this={ editableDiv } contenteditable="true" class="editable-div"></div>
<textarea { id } { name } aria-hidden="true" bind:this={ sanitizedTextarea }></textarea>

<Modal header="Add" on:functions={ bindModalFunctions }>
  <button class="brand" type="button" on:click={ () => { addLink('https://sensethenlove.com', 'Link', true); hideModal(); } }>Add Link</button>
  <button class="brand" type="button" on:click={ () => { addLink('/social', '#I AM'); hideModal(); } }>Add Hash Tag</button>
  <button class="brand" type="button" on:click={ () => { addLink('/social', '@Chris Carrington'); hideModal(); } }>Add Friend Tag</button>
</Modal>


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
