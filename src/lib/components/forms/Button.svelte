<script lang="ts">
  import loading from '$lib/images/loading.svg'

  export let text: string
  export let disabled: boolean = false
  export let isLoading: boolean = false
  export let color: string = 'brand'
</script>


<button class="full-width { color } { isLoading ? 'loading': '' }" disabled={ isLoading || disabled }>
  { @html loading }
  <span class="text">{ text }</span>
</button>
