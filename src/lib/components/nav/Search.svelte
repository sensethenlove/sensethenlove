<script lang="ts">
  import schema from '$lib/schema/search'
  import { showToast } from '$lib/util/toast'
  import Modal from '$lib/components/Modal.svelte'
  import Form from '$lib/components/forms/Form.svelte'
  import SVG_SEARCH from '$lib/svg/nav/SVG_SEARCH.svg'
  import Source from '$lib/components/source/Source.svelte'
  import type { Source as SourceType, ShowModal, OnModalHide, FormInputs, FormOnSuccess, FormOnSubmitValidate } from '$lib/types/all'

  let showModal: ShowModal
  let response: { quotesByText?: SourceType[], sourcesByTitle?: SourceType[] } | null = null

  const onSubmitValidate = ((fields) => {
    let isValid = true

    if (fields.quotesByText?.toString() !== 'on' && fields.sourcesByTitle?.toString() !== 'on') {
      showToast({ type: 'info', items: [ 'Select atleast one checkbox please' ] })
      isValid = false
    }

    return isValid
  }) satisfies FormOnSubmitValidate

  const onSuccess = (({ data }) => {
    if (!data?.quotesByText?.length && !data?.sourcesByTitle?.length) showToast({ type: 'info', items: [ 'No search results found' ] })
    else response = data
  }) satisfies FormOnSuccess

  const onHideModal = (() => {
    response = null
  }) satisfies OnModalHide

  const inputs: FormInputs = [
    { name: 'query', focusOnInit: true, autocomplete: 'off' },
    { name: 'sourcesByTitle', label: 'Search library titles',  type: 'checkbox' },
    { name: 'quotesByText', label: 'Search science quotes', type: 'checkbox' },
  ]
</script>


<button class="search__button brand" on:click={ () => { showModal() } } title="Click to search">
  { @html SVG_SEARCH }
</button>

<Modal header="Search" on:functions={ e => showModal = e.detail.showModal } { onHideModal }>
  <Form { inputs } { schema } { onSubmitValidate } { onSuccess } reset={ false } action="search" buttonText="Search" />

  { #if response?.quotesByText?.length || response?.sourcesByTitle?.length }
    <div class="response">
      { #if response?.sourcesByTitle?.length }
        <div class="papyrus three">Source title results:</div>
        { #each response.sourcesByTitle as source }
          <Source { source } location="search--source-titles" />
        { /each }
      { /if }

      { #if response?.quotesByText?.length }
        <div class="papyrus three">Source quote results:</div>
        { #each response.quotesByText as source }
          <Source { source } location="search--with-quote" />
        { /each }
      { /if }
    </div>
  { /if }
</Modal>


<style lang="scss">
  @import '$lib/scss/variables.scss';

  .papyrus {
    margin-top: 2.1rem;
  }

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
