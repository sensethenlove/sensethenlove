<script lang="ts">
  import Head from '$lib/components/Head.svelte'
  import getImageUrl from '$lib/file/getImageUrl'
  import SVG_VENMO from '$lib/svg/logo/SVG_VENMO.svg'
  import SVG_PAYPAL from '$lib/svg/logo/SVG_PAYPAL.svg'
  import SVG_FACEBOOK from '$lib/svg/logo/SVG_FACEBOOK.svg'
  import SVG_INSTAGRAM from '$lib/svg/logo/SVG_INSTAGRAM.svg'
  import { CF_OG_LINKS, CF_CHRIS_GUITAR } from '$lib/util/cloudflareImages'

  let picSrc: string

  const dates = {
    next: new Date(2023, 6, 5, 17, 10), // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
    nextNext: new Date(2023, 6, 5, 18, 45), // new Date(year, monthIndex, day, hours, minutes, seconds)
  }

  const remaining = {
    next: getRemaining(dates.next),
    nextNext: getRemaining(dates.nextNext),
  }

  $: if (CF_CHRIS_GUITAR) picSrc = getImageUrl(CF_CHRIS_GUITAR)

  function getRemaining (upcomingDate: Date) {
    let remaining = ''
    const MINUTE_IN_MS = 60000
    const CLASS_LENGTH_IN_MINUTES = 75
    const difference = +upcomingDate - +new Date()

    if (difference > 0) {
      const parts = new Map([
        ['days',    Math.floor(difference / (1000 * 60 * 60 * 24))],
        ['hours',   Math.floor((difference / (1000 * 60 * 60)) % 24)],
        ['minutes', Math.floor((difference / 1000 / 60) % 60)],
        ['seconds', Math.floor((difference / 1000) % 60)],
      ])

      for (const [ key, value ] of parts) {
        if (value) remaining +=  `${ value } ${ key } `
      }
    }
    else if ((difference / MINUTE_IN_MS) > -CLASS_LENGTH_IN_MINUTES) remaining = 'Class happening now!'
    else remaining = 'Class just ended!'

    return remaining
  }

  setInterval(() => {
    remaining.next = getRemaining(dates.next)
    remaining.nextNext = getRemaining(dates.nextNext)
  }, 1000)
</script>


<Head title="Links" ogImageId={ CF_OG_LINKS } description="Chris Carrington Links!" />
<div class="profile-pic">
  <img src={ picSrc } alt="Chris Carrington playing guitar" />
</div>

<section class="title">
  <div class="papyrus one">Chris Carrington</div>
  <div class="papyrus four">Gentle Yoga & Sound Healing</div>
</section>

<a href="https://teams.live.com/meet/9355564920768" class="link" target="_blank">
  <section class="title">🥰 Join Class Live</section>
</a>

<a href="https://soulconnectionscommunitycenter.com/" class="link" target="_blank">
  <section class="title">📍 Soul Connections Community Center · Studio</section>
</a>

<a href="/contact" class="link">
  <section class="title">👋 Get in touch</section>
</a>

<section class="title">
  <div class="logos">
    <a href="https://instagram.com/feelinglovelynow" target="_blank">{ @html SVG_INSTAGRAM }</a>
    <a href="https://venmo.com/u/feelinglovelynow" target="_blank">{ @html SVG_VENMO }</a>
    <a href="https://facebook.com/feelinglovelynow" target="_blank">{ @html SVG_FACEBOOK }</a>
    <a href="https://paypal.me/feelinglovelynow" target="_blank">{ @html SVG_PAYPAL }</a>
  </div>
</section>

<section class="title remaining">
  <div>Next Class · 7/5 @ 5:10pm PST</div>
  <div>{ remaining.next }</div>
</section>

<section class="title remaining">
  <div>Next Next Class · 7/5 @ 6:45pm PST</div>
  <div>{ remaining.nextNext }</div>
</section>

<section class="title">Class is free, donations welcome, all welcome!</section>


<style lang="scss">
  .profile-pic {
    height: 9rem;
    border-radius: 50%;
    overflow: hidden;
    aspect-ratio: 1/1;
    margin-bottom: 1.5rem;

    img {
      width: 111%;
      transform: translate(0rem, -7.9rem);
    }
  }

  .remaining {
    font-size: 1.8rem;

    div:first-child {
      margin-bottom: 0.6rem;
    }
  }

  .link {
    font-size: 2.1rem;
  }

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
