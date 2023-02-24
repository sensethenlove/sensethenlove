<script lang="ts">
  import { onMount } from 'svelte'
  import htmlSanitize from '$lib/util/htmlSanitize'

  export let id: string
  export let name: string
  export let label: string
  export let clearErrors: () => void

  let editableDiv: HTMLDivElement
  let sanitizedTextarea: HTMLTextAreaElement

  function onInput () {
    if (sanitizedTextarea && editableDiv && typeof editableDiv.textContent === 'string') {
      sanitizedTextarea.value = htmlSanitize(editableDiv.innerHTML)
    }

    clearErrors()
  }

  function addTag () {

    removeTailBr()

    const content = editableDiv.innerHTML
    const tag = '<a href="https://sensethenlove.com">@Chris Carrington</a>'

    if (content.endsWith('<br></div>')) {
      const length = content.length
      const position = length - 11
      editableDiv.innerHTML = content.substring(0, position) + ` ${ tag }` + content.substring(position)
    } else if (content.length) {
      editableDiv.innerHTML += ` ${ tag }`
    } else {
      editableDiv.innerHTML = tag
    }

    onInput()
  }

  function removeTailBr () {
    if (editableDiv.innerHTML.endsWith('<br>')) {
      editableDiv.innerHTML = editableDiv.innerHTML.slice(0, -4)
    }
  }

  onMount(() => {
    if (sanitizedTextarea) sanitizedTextarea.value = '' // sometimes forms hold their value, this ensures on a fresh load the textarea is empty
  })
</script>


<div class="above">
  <label for={ id }>{ label }</label>
  <button class="brand" type="button" on:click={ () => { addTag() } }>Tag Friend in Post</button>
</div>

<div on:input={ () => { onInput() } } bind:this={ editableDiv } contenteditable="true"></div>
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
