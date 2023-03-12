<script lang="ts">
  import schema from '$lib/schema/search'
  import { showToast } from '$lib/util/toast'
  import Modal from '$lib/components/Modal.svelte'
  import Form from '$lib/components/forms/Form.svelte'
  import SVG_SEARCH from '$lib/svg/nav/SVG_SEARCH.svg'
  import Source from '$lib/components/source/Source.svelte'
  import Culture from '$lib/components/source/Culture.svelte'
  import Product from '$lib/components/source/Product.svelte'
  import type { SearchResponse, ShowModal, OnModalHide, FormInputs, FormOnSuccess, FormOnSubmitValidate } from '$lib/types/all'


  let showModal: ShowModal
  let response: SearchResponse | null = null
  const searchOptions = [ 'quotesByText', 'sourcesByTitle', 'sourcesByDescription' ]
  const inputs: FormInputs = [
    { name: 'query', focusOnInit: true, autocomplete: 'off' },
    { name: 'sourcesByTitle', label: 'Search library titles',  type: 'checkbox' },
    { name: 'sourcesByDescription', label: 'Search library descriptions',  type: 'checkbox' },
    { name: 'quotesByText', label: 'Search science quotes', type: 'checkbox' },
  ]


  const onSubmitValidate = ((fields) => {
    let isValid = false

    for (const option of searchOptions) {
      if (fields[option]?.toString() === 'on') isValid = true
    }

    if (!isValid) {
      showToast({ type: 'info', items: [ 'Select atleast one checkbox please' ] })
      isValid = false
    }

    return isValid
  }) satisfies FormOnSubmitValidate


  const onSuccess = (({ data }) => {
    let resultsFound = false

    for (const option of searchOptions) {
      if (data?.[ option ]?.length) resultsFound = true
    }

    if (!resultsFound) showToast({ type: 'info', items: [ 'No search results found' ] })
    else response = data
  }) satisfies FormOnSuccess


  const onHideModal = (() => {
    response = null
  }) satisfies OnModalHide
</script>


<button class="search__button brand" on:click={ () => { showModal() } } title="Click to search">
  { @html SVG_SEARCH }
</button>

<Modal header="Search" on:functions={ e => showModal = e.detail.showModal } { onHideModal }>
  <Form { inputs } { schema } { onSubmitValidate } { onSuccess } reset={ false } action="search" buttonText="Search" />

  <div class="response">
    { #if response?.sourcesByTitle?.length }
      <div class="papyrus three">Library title results:</div>
      { #each response.sourcesByTitle as source }
        { #if source.type === 'SCIENCE' }
          <Source { source } location="search--source-titles" />
        { :else if source.type === 'CULTURE' }
          <Culture { source } location="search--source-titles" />
        { :else if source.type === 'PRODUCT' }
          <Product { source } location="search--source-titles" />
        { /if }
      { /each }
    { /if }

    { #if response?.sourcesByDescription?.length }
      <div class="papyrus three">Library description results:</div>
      { #each response.sourcesByDescription as source }
        { #if source.type === 'SCIENCE' }
          <Source { source } location="search--source-titles" />
        { :else if source.type === 'CULTURE' }
          <Culture { source } location="search--source-titles" />
        { :else if source.type === 'PRODUCT' }
          <Product { source } location="search--source-titles" />
        { /if }
      { /each }
    { /if }

    { #if response?.quotesByText?.length }
      <div class="papyrus three">Science quote results:</div>
      { #each response.quotesByText as source }
        <Source { source } location="search--with-quote" />
      { /each }
    { /if }
  </div>
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
      left: 2rem;
      padding: 0.36rem;
      display: flex;
      transition: all 0.9s;
      align-items: center;
      justify-content: center;
      z-index: $zindex-search-button;

      @media only screen and (min-width: $move-nav-window-width) { // big screen
        top: $theme-search-top;
        left: calc(100vw - 32rem);
      }

      :global(svg) {
        width: 2.7rem;
        height: 2.7rem;
      }
    }
  }
</style>
