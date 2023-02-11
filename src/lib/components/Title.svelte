<script lang="ts">
  export let h1: string = ''
  export let h3: string = ''
  export let h4: string = ''
  export let h5: string = ''
  export let css: string = ''
  export let noBottom: boolean = false
</script>


<section class="title { noBottom ? 'no-bottom' : '' } { css }">
  { #if h1 } <h1>{ h1 }</h1>
  { :else if h3 } <h3>{ @html h3 }</h3>
  { :else if h4 } <h4>{ h4 }</h4>
  { :else if h5 } <h5>{ @html h5 }</h5>
  { :else } <h3><slot /></h3>
  { /if }
</section>
