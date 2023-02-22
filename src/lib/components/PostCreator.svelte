<script lang="ts">
  import {  Jodit } from 'jodit'
  import { onMount } from 'svelte'
  import 'jodit/build/jodit.min.css'
  import { theme } from '$lib/util/store'
  import sanitizeHtml from 'sanitize-html' 
  import loading from '$lib/images/loading.svg'
  // import {  Jodit } from 'jodit/build/jodit.es2018.js' // unminified (helpful for debug breakpoints)

  let preview: HTMLDivElement
  let isLoading: boolean = true
  let textarea: HTMLTextAreaElement

  function displayPreview (editor: Jodit, preview: HTMLDivElement) {
    if (editor && preview) {
      preview.innerHTML = sanitizeHtml(editor.value, {
        allowedAttributes: Object.assign({ iframe: [ 'src' ], span: [ 'style' ] }, sanitizeHtml.defaults.allowedAttributes),
        allowedIframeHostnames: [ 'www.youtube.com', 'player.vimeo.com' ],
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'iframe' ]),
        allowedSchemesByTag: {
          img: [ 'data', 'https' ]
        }
      })
    }
  }

  onMount(() => {
    const editor = Jodit.make(textarea, {
      placeholder: 'Aloha!',
      theme: $theme === 'dark' ? 'dark' : 'default',
      buttons: 'bold,italic,underline,strikethrough,ul,ol,fontsize,image,video,hr,link,symbols,indent,outdent,left,right,center,undo,redo,fullsize,preview'
    })

    if (editor) {
      isLoading = false
      displayPreview(editor, preview)

      editor.e.on('change', () => {
        displayPreview(editor, preview)
      })

      editor.s.focus()

      const joditContainer = document.querySelector('.post-creator .jodit-container') 

      if (joditContainer) {
        theme.subscribe(value => {
          if (value === 'dark') joditContainer.classList.add('jodit_theme_dark')
          else joditContainer.classList.remove('jodit_theme_dark')
        })
      }
    }

    return () => { // on component destroy
      if (editor) editor.destruct() // destroy editor
    }
  })
</script>


<div class="post-creator { isLoading ? 'is-loading' : '' }">
  { @html loading }
  <textarea bind:this={ textarea }></textarea>
  <div bind:this={ preview }></div>
</div>


<style lang="scss">
  @import '$lib/scss/variables';

  .post-creator {
    width: 100vw;
    padding: 0 0.9rem;

    @media only screen and (min-width: 54rem) { // big screen
      width: 90rem;
      padding: 0;
    }

    &.is-loading {
      :global(.loading-icon) {
        opacity: 1;
      }

      textarea {
        opacity: 0;
      }
    }

    textarea,
    :global(.loading-icon) {
      transition: all 0.3s;
    }

    textarea {
      opacity: 1;
    }

    :global(.loading-icon) {
      position: absolute;
      left: 50%;
      margin-left: -3rem;
      width: 6rem;
      opacity: 0;
      color: var(--anchor-color);
    }

    @keyframes jodi-in {
      0% {
        opacity: 0;
        transform: translateY(-9rem);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    :global(.jodit-container) {
      animation-name: jodi-in;
      animation-duration: 0.6s;
    }

    :global(.jodit-placeholder) {
      margin-top: 18px !important;
    }

    :global(.jodit-status-bar__item-right) {
      display: none;
    }

    :global(.jodit_theme_dark) :global(.jodit-wysiwyg) {
      color: var(--text-color);
      background-color: var(--input-bg-color);
    }
  }
</style>
