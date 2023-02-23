import { Jodit } from 'jodit'
import { onMount } from 'svelte'
import htmlSanitize from '$lib/util/htmlSanitize'
import getJoditOptions from '$lib/form/getJoditOptions'


export default (type: string, theme: string, clearErrors: () => void): JoditVariables => {
  const joditVariables: JoditVariables = {} 

  if (type === 'jodit') {
    joditVariables.isLoading = true

    onMount(() => {
      let editor: Jodit

      if (joditVariables.initTextarea) {
        editor = Jodit.make(joditVariables.initTextarea, getJoditOptions(theme))

        if (editor) {
          function bindSanitized() {
            if (joditVariables.sanitizedTextarea) joditVariables.sanitizedTextarea.value = htmlSanitize(editor.value)
          }

          bindSanitized()
          joditVariables.isLoading = false

          editor.e.on('change', () => {
            bindSanitized()
            clearErrors()
          })
        }
      }

      return () => { // on component destroy
        if (editor) editor.destruct() // destroy editor
      }
    })
  }

  return joditVariables
}


type JoditVariables = {
  isLoading?: boolean,
  initTextarea?: HTMLTextAreaElement,
  sanitizedTextarea?: HTMLTextAreaElement
}
