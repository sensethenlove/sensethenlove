<script lang="ts">
  import Loading from '$lib/images/svg/Loading.svg'

  export let text: string
  export let disabled: boolean = false
  export let isLoading: boolean = false
  export let color: string = 'cyan-to-blue'
</script>


<button class="full-width { color } { isLoading ? 'loading': '' }" disabled={ isLoading || disabled }>
  { @html Loading }
  <span class="text">{ text }</span>
</button>
