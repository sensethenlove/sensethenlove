import { onMount } from 'svelte'
import showToast from '@sensethenlove/toast'
import getImageUrl from '$lib/file/getImageUrl'
import isFileAnImage from '$lib/file/isFileAnImage'
import { IsFileAnImageError } from '$lib/errors/all'
import type { ImageVariableFormItem } from '$lib/types/all'


export default (type: string, bind: (imageVariables: ImageVariableFormItem) => void, serverImages: string[]): ImageVariableFormItem => {
  const imageVariables: ImageVariableFormItem = {
    previewImages: [],
  }

  if (type === 'image') {
    onMount(() => {
      if (serverImages.length) {
        imageVariables.serverImages = []

        for (const id of serverImages) {
          imageVariables.serverImages.push(getImageUrl(id))
        }
      }

      if (imageVariables.fileInput) { // defined in DOM
        imageVariables.fileInput.value = ''

        imageVariables.onChange = () => {
          let imageLoadCount = 0
          imageVariables.previewImages = []

          if (imageVariables.fileInput && imageVariables.fileInput.files instanceof FileList) { // defined in DOM
            const imageLoadTotal = imageVariables.fileInput.files.length

            for (const file of imageVariables.fileInput.files) {
              if (file instanceof Blob) {
                try {
                  isFileAnImage(file)
                  const reader = new FileReader()
                  reader.onload = e => {
                    if (typeof e.target?.result === 'string') { // is not an ArrayBuffer so we may continue
                      imageLoadCount++
                      imageVariables.previewImages.push(e.target.result)
                      if (imageLoadCount === imageLoadTotal) bind(imageVariables) // on last image to be loaded => bind image variables
                    }
                  }
                  reader.readAsDataURL(file) // triggers onload fn above
                } catch (e) {
                  if (e instanceof IsFileAnImageError) {
                    imageVariables.fileInput.value = ''
                    showToast({ type: 'info', items: [e.toString()] })
                  }
                }
              }
            }            
          }
        }
      }

      bind(imageVariables)
    })
  }

  return imageVariables
}
