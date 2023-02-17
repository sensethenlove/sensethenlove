<script lang="ts">
  import { onMount } from 'svelte'
  import { showToast } from '$lib/util/toast'
  import isFileAnImage from '$lib/file/isFileAnImage'
  import { IsFileAnImageError } from '$lib/util/errors'
  import getCloudflareImageUrl from '$lib/file/getCloudflareImageUrl'

  export let errors: any
  export let name: string
  export let css: string = ''
  export let label: string = ''
  export let type: string = 'text'
  export let value: string | null = ''
  export let serverImageId: string = ''
  export let checkboxValue: boolean | null = false

  let itemErrors: any
  let id: string = crypto.randomUUID()

  $: if (errors) itemErrors = errors?.[ name ]?._errors

  function clearErrors() {
    if (itemErrors?.length) itemErrors.length = 0
  }

  const imageVariables: {
    fileElement?: HTMLInputElement,
    previewImage?: HTMLImageElement,
    serverImage?: HTMLImageElement,
    onFileSelected?: () => void,
  } = {}

  if (type === 'image') onMount(bindImageVariables)

  async function bindImageVariables () {
    if (imageVariables.fileElement && imageVariables.previewImage && imageVariables.serverImage) { // defined in DOM
      imageVariables.fileElement.value = ''
      imageVariables.previewImage.src = ''
      imageVariables.previewImage.style.display = 'none'

      if (!serverImageId) imageVariables.serverImage.style.display = 'none'
      else {
        imageVariables.serverImage.src = `${ getCloudflareImageUrl(serverImageId) }`
        imageVariables.serverImage.style.display = 'block'
      }

      imageVariables.onFileSelected = () => {
        if (imageVariables.fileElement) { // defined in DOM
          const file = imageVariables.fileElement.files?.[0]

          if (file instanceof Blob) {
            try {
              isFileAnImage(file)
              const reader = new FileReader()
              reader.onload = e => {
                if (imageVariables.previewImage && imageVariables.serverImage) { // defined in DOM
                  if (typeof e.target?.result === 'string') { // is not an ArrayBuffer so we may continue
                    imageVariables.previewImage.src = e.target.result
                    imageVariables.previewImage.style.display = 'block'
                    imageVariables.serverImage.style.display = 'none'
                  }
                }
              }
              reader.readAsDataURL(file) // triggers onload fn above
            } catch (e) {
              if (e instanceof IsFileAnImageError) {
                imageVariables.fileElement.value = ''
                showToast({ type: 'error', items: [ e.toString() ] })
              }
            }
          }
        }
      }
    }
  }
</script>


{ #if type === 'image' }
  <img bind:this={ imageVariables.serverImage } alt="Primary" />
  <img bind:this={ imageVariables.previewImage } alt="Preview" /> 
{/if}

<div class="form-item form-item--{ type } { css }">
  { #if type === 'textarea' }
    <label for={ id }>{ label }</label>
    <textarea class={ itemErrors?.length ? 'error': '' } { value } on:input={ () => { clearErrors() } } { name } { id } />
  { :else if type === 'checkbox' }
    <label for={ id } class="checkbox { itemErrors?.length ? 'error': '' }" on:input={ () => { clearErrors() } }>
      <div class="checkbox-input-wrapper">
        <input { id } { name } checked={ checkboxValue } type="checkbox" />
      </div>
      { @html label }
    </label>
  { :else if type === 'image' }
    <label for={ id }>{ label }</label>
    <input class={ itemErrors?.length ? 'error': '' } on:input={ () => { clearErrors() } } { name } { id } type="file" accept=".jpg, .jpeg, .png" on:change={ imageVariables.onFileSelected  } bind:this={ imageVariables.fileElement } />
  { :else }
    <label for={ id }>{ label }</label>
    <input { value } class={ itemErrors?.length ? 'error': '' } on:input={ () => { clearErrors() } } { name } { id } { type } />
  { /if }
  { #if itemErrors?.length }
    { #each itemErrors as error }
      <div class="error">{ error }</div>
    { /each }
  { /if }
</div>


<style>
  img {
    display: none;
    width: 56rem;
    max-width: 100%;
    margin-bottom: 1rem;
  }
</style>
