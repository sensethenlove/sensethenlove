<script lang="ts">
  import SVG_INFO from '$lib/svg/SVG_INFO.svg'
  import Head from '$lib/components/Head.svelte'
  import getImageUrl from '$lib/file/getImageUrl'
  import SVG_VENMO from '$lib/svg/logo/SVG_VENMO.svg'
  import SVG_PAYPAL from '$lib/svg/logo/SVG_PAYPAL.svg'
  import SVG_FACEBOOK from '$lib/svg/logo/SVG_FACEBOOK.svg'
  import SVG_INSTAGRAM from '$lib/svg/logo/SVG_INSTAGRAM.svg'
  import { CF_OG_LINKS, CF_CHRIS_GUITAR } from '$lib/util/cloudflareImages'

  let picSrc: string
  let descriptionDIV: HTMLDivElement

  const dates = { // https://savvytime.com/converter/utc-to-ca-los-angeles
    next: Date.UTC(2023, 6, 6, 0, 10), // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC
    nextNext: Date.UTC(2023, 6, 6, 1, 45), // Date.UTC(year, monthIndex, day, hour, minute)
  }

  const remaining = {
    next: getRemaining(dates.next),
    nextNext: getRemaining(dates.nextNext),
  }

  $: if (CF_CHRIS_GUITAR) picSrc = getImageUrl(CF_CHRIS_GUITAR)

  function getRemaining (upcomingDate: number) {
    let remaining = ''
    const MINUTE_IN_MS = 60000
    const CLASS_LENGTH_IN_MINUTES = 75
    const difference = upcomingDate - +new Date()

    if (difference > 0) {
      const parts = new Map([ // https://www.digitalocean.com/community/tutorials/js-building-countdown-timer
        ['days',    Math.floor(difference / (1000 * 60 * 60 * 24))],
        ['hours',   Math.floor((difference / (1000 * 60 * 60)) % 24)],
        ['minutes', Math.floor((difference / 1000 / 60) % 60)],
        ['seconds', Math.floor((difference / 1000) % 60)],
      ])

      for (const [ key, value ] of parts) {
        if (value) {
          if (value === 1) remaining +=  `${ value } ${ key.substring(0, key.length - 1) } `
          else remaining +=  `${ value } ${ key } `
        }
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

  function showDescription () {
    descriptionDIV.classList.add('visible')
  }

  function hideDescription () {
    descriptionDIV.classList.remove('visible')
  }
</script>


<Head title="Links" ogImageId={ CF_OG_LINKS } description="Chris Carrington offers free, Gentle Yoga & Sound Healing classes, in Mount Shasta & online. This page provides links & helpful information to stay connected with Chris & his class!" />
<div class="profile-pic">
  <img src={ picSrc } alt="Chris Carrington playing guitar" />
</div>

<section class="title meta-wrapper">
  <div class="papyrus one">Chris Carrington</div>
  <div class="papyrus four">
    <span class="title">
      <span>Gentle Yoga & Sound Healing</span>
       <button
          class="info"
          type="button"
          on:focus={ showDescription }
          on:blur={ hideDescription }
          on:mouseover={ showDescription }
          on:mouseleave={ hideDescription}>
          { @html SVG_INFO }
        </button>
    </span>
  </div>
  <div class="description" bind:this={ descriptionDIV }>
    <ul>
      <li>Chris Carrington offers free, Gentle Yoga & Sound Healing classes, in Mount Shasta & online.</li>
      <li>Chris's Yoga & Sound Healing class features stretches that are gentle, simple & effective. Each stretch is typically held for a couple minutes, to allow time for gravity to gently open us up.</li>
      <li>The stretch or neutral position that feels good to you is far more important then what Chris suggests, so in class you are free free to listen to, cultivate & follow your intuitive guidance.</li>
      <li>Class features many flows, which are opportunities to mix several stretches together @ any pace you love.</li>
      <li>During the majority of stretches crystal singing bowls, guitar or gongs are gently played, live.</li>
      <li>There are also several opportunities to learn, practice & enjoy simple mindfulness meditation techniques that may be implemented outside of class whenever we please.</li>
      <li>Free mats available, donations welcome, all welcome!</li>
    </ul>
  </div>
</section>

<a href="https://teams.live.com/meet/9355564920768" class="link" target="_blank">
  <section class="title">🥰 Join Class Live</section>
</a>

<a href="https://soulconnectionscommunitycenter.com/" class="link" target="_blank">
  <section class="title">
    <div>📍 Soul Connections Community Center</div>
    <div>329 N Mt Shasta Blvd, Mount Shasta</div>
    <div>(530) 859-8831</div>
  </section>
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

  .meta-wrapper {

    .title {
      position: relative;
    }

    .info {
      border: none;
      background-color: transparent;
      padding: 0;
      transform: translate(0, 0.36rem);

      :global(svg) {
        color: var(--anchor-color);
        height: 2.1rem;
        aspect-ratio: 1/1;
        transform: translate(0, 0.1rem);
      }
    }

    .description {
      width: 0;
      opacity: 0;
      max-height: 0;
      max-width: 81vw;
      overflow: hidden;
      transition: opacity 0.36s;
      text-align: left;

      div {
        margin-bottom: 0.9rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    :global(.description.visible) {
      width: 81rem;
      opacity: 1;
      max-height: 81rem;
    }
  }
</style>
