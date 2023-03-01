<script lang="ts">
  import '$lib/scss/modal.scss'
  import SVG_CLOSE from '$lib/svg/SVG_CLOSE.svg'
  import { onMount, createEventDispatcher } from 'svelte'
  import type { ShowModal, HideModal } from '$lib/util/types'


  export let header: string = ''
  export let onHideModal: () => void = () => {}


  let setHideCss = false
  let isModalVisible = false
  const dispatch = createEventDispatcher()


  const showModal = (() => {
    isModalVisible = true
    document.body.style.overflow = 'hidden'

    document.addEventListener('keyup', onKeyup)
  }) satisfies ShowModal


  const hideModal = (() => {
    setHideCss = true
    document.body.style.overflow = 'auto'

    setTimeout(() => {
      setHideCss = false
      isModalVisible = false
      onHideModal()
    }, 900)

    document.removeEventListener('keyup', onKeyup)
  }) satisfies HideModal


  onMount(() => {
    dispatch('functions', { showModal, hideModal })

    return () => {
      document.removeEventListener('keyup', onKeyup)
    }
  })


  function onKeyup (e: KeyboardEvent): void {
    if (e.key === 'Escape') hideModal()
  }
</script>


{ #if isModalVisible }
  <div on:click={ hideModal } on:keyup={ onKeyup } class="modal--container{ setHideCss ? ' hide': '' }" aria-label="Click to hide modal">
    <div on:click|stopPropagation on:keyup={ onKeyup } class="modal{ setHideCss ? ' hide': '' }">
      { #if header}
        <div class="modal__header">
          <div class="papyrus two">{ header }</div>
          <button class="modal__header__close" on:click={ hideModal }>{ @html SVG_CLOSE }</button>
        </div>
      { /if }
      <div class="modal__body">
        <slot />
      </div>
    </div>
  </div>
{ /if }
