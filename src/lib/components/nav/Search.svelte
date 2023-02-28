<script lang="ts">
  import schema from '$lib/schema/search'
  import { showToast } from '$lib/util/toast'
  import Modal from '$lib/components/Modal.svelte'
  import Form from '$lib/components/forms/Form.svelte'
  import SVG_SEARCH from '$lib/svg/nav/SVG_SEARCH.svg'
  import type { ShowModal, FormInputs, FormOnSuccess, FormOnSubmitValidate } from '$lib/util/types'

  let showModal: ShowModal

  const onSubmitValidate = ((fields) => {
    let isValid = true

    if (fields.quotesByText?.toString() !== 'on' && fields.sourcesByTitle?.toString() !== 'on') {
      showToast({ type: 'info', items: [ 'Select atleast one checkbox please' ] })
      isValid = false
    }

    return isValid
  }) satisfies FormOnSubmitValidate

  const onSuccess = (({ data }) => {
    console.log(data)
  }) satisfies FormOnSuccess

  const inputs: FormInputs = [
    { name: 'query', focusOnInit: true, autocomplete: 'off' },
    { name: 'sourcesByTitle', label: 'Search source titles',  type: 'checkbox' },
    { name: 'quotesByText', label: 'Search source quote text', type: 'checkbox' },
  ]
</script>


<button class="search__button brand" on:click={ () => { showModal() } } title="Click to search">
  { @html SVG_SEARCH }
</button>

<Modal header="Search" on:functions={ e => showModal = e.detail.showModal }>
  <Form { inputs } { schema } { onSubmitValidate } { onSuccess } reset={ false } action="search" buttonText="Search" />
</Modal>


<style lang="scss">
  @import '$lib/scss/variables.scss';

  .search {
    &__button {
      position: fixed;
      top: calc(100vh - 12rem);
      right: calc(100vw - 5rem);
      padding: 0.36rem;
      display: flex;
      transition: all 0.9s;
      align-items: center;
      justify-content: center;
      z-index: $zindex-search-button;

      @media only screen and (min-width: $move-nav-window-width) { // big screen
        top: 1.75rem;
        right: 28rem;
      }

      :global(svg) {
        width: 2.7rem;
        height: 2.7rem;
      }
    }
  }
</style>
