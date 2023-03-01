<script lang="ts">
  export let css: string = ''
  export let text: string = ''
  export let noBottom: boolean = false
  export let size: 'one' | 'two' | 'three' | 'four' | 'five' = 'three'
</script>


<section class="title { noBottom ? 'no-bottom' : '' } { css }">
  <div class="papyrus { size }">
    { text }
    <slot />
  </div>
</section>


<style>
  .papyrus {
    text-align: center;
    margin: 0.9rem 0.6rem 0.6rem 0.6rem;
  }
</style>
