<script lang="ts">
  import Title from '$lib/components/Title.svelte'
  import SVG_PAYPAL from '$lib/svg/logo/SVG_PAYPAL.svg'
  import SVG_VENMO from '$lib/svg/logo/SVG_VENMO.svg'
  import SVG_FACEBOOK from '$lib/svg/logo/SVG_FACEBOOK.svg'
  import SVG_INSTAGRAM from '$lib/svg/logo/SVG_INSTAGRAM.svg'
</script>

<Title>
  <div class="logos">
    <a href="https://instagram.com/feelinglovelynow" target="_blank">{ @html SVG_INSTAGRAM }</a>
    <a href="https://venmo.com/u/feelinglovelynow" target="_blank">{ @html SVG_VENMO }</a>
    <a href="https://facebook.com/feelinglovelynow" target="_blank">{ @html SVG_FACEBOOK }</a>
    <a href="https://paypal.me/feelinglovelynow" target="_blank">{ @html SVG_PAYPAL }</a>
  </div>
</Title>


<style lang="scss">
  .logos {
    height: 3.2rem;

    a {
      display: inline-block;
      height: 3.2rem;
      aspect-ratio: 1/1;
      margin: 0 0.9rem;
    }
  }
</style>
