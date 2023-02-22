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
      debugger
      preview.innerHTML = sanitizeHtml(editor.value, {
        allowedTags: [ 'p', 'u', 's', 'em', 'ol', 'ul', 'li', 'span', 'strong', 'a', 'hr', 'br' ],
        allowedAttributes: {
          p: [ 'style' ],
          u: [ 'style' ],
          s: [ 'style' ],
          em: [ 'style' ],
          ol: [ 'style' ],
          ul: [ 'style' ],
          li: [ 'style' ],
          span: [ 'style' ],
          strong: [ 'style' ],
          a: [ 'style', 'href', 'src', 'target', 'title' ],
        }
      })
    }
  }

  onMount(() => {
    const buttons = 'bold,italic,underline,strikethrough,ul,ol,fontsize,hr,link,symbols,indent,outdent,left,right,center,undo,redo,fullsize,preview'

    const editor = Jodit.make(textarea, {
      buttons,
      autofocus: true,
      statusbar: false,
      buttonsMD: buttons,
      buttonsSM: buttons,
      buttonsXS: buttons,
      disablePlugins: 'table,iframe',
      theme: $theme === 'dark' ? 'dark' : 'default',
      placeholder: 'Share a lovely goal, achievement or goal progress!',
      cleanHTML: {
        allowTags: {
          hr: true,
          br: true,
          p: { style: true },
          u: { style: true },
          s: { style: true },
          em: { style: true },
          ol: { style: true },
          ul: { style: true },
          li: { style: true },
          span: { style: true },
          strong: { style: true },
          a: { style: true, href: true, src: true, target: true, title: true },
        }
      }
    })

    if (editor) {
      isLoading = false
      displayPreview(editor, preview)

      editor.e.on('change', () => {
        displayPreview(editor, preview)
      })
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
      border: none;
      border-radius: 1.8rem;
      overflow: hidden;
      background-color: var(--input-bg-color);
    }

    :global(.jodit-placeholder) {
      margin-top: 18px !important;
    }

    :global(.jodit-add-new-line) {
      display: none;
    }

    :global(.jodit-workplace) {
      transform: translateY(-0.18rem);
    }
  }

  :global(.jodit-ui-block__className),
  :global(.jodit-ui-form__nofollow) {
    display: none;
  }

  :global(.jodit-symbols__table td a) {
    color: var(--text-color);
  }
  
  :global(.jodit-wysiwyg),
  :global(.jodit-dialog__panel) {
    color: var(--text-color) !important;
    background-color: var(--input-bg-color) !important;
  }

  :global(.jodit-icon),
  :global(.jodit-toolbar-button__trigger) {
    fill: var(--text-color) !important;
    stroke: var(--text-color) !important;
  }

  :global(.theme--light .jodit-toolbar__box) {
    background-color: #f9f9f9 !important;
  }

  :global(.theme--dark .jodit-toolbar__box) {
    background-color: #5f5c5c !important;
  }
</style>
