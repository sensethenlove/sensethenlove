import { onMount } from 'svelte'
import { showToast } from '$lib/util/toast'
import isFileAnImage from '$lib/file/isFileAnImage'
import { IsFileAnImageError } from '$lib/util/errors'
import getCloudflareImageUrl from '$lib/file/getCloudflareImageUrl'


export default (type: string, serverImageId: string): ImageVariables => {
  const imageVariables: ImageVariables = {}

  if (type === 'image') {
    onMount(() => {
      if (imageVariables.fileElement && imageVariables.previewImage && imageVariables.serverImage) { // defined in DOM
        imageVariables.fileElement.value = ''
        imageVariables.previewImage.removeAttribute('src') // if we set src to an empty string some browsers will set src to the url of the page
        imageVariables.previewImage.style.display = 'none'

        if (!serverImageId) imageVariables.serverImage.style.display = 'none'
        else {
          imageVariables.serverImage.src = `${getCloudflareImageUrl(serverImageId)}`
          imageVariables.serverImage.style.display = 'block'
        }

        imageVariables.onFileSelected = () => {
          if (imageVariables.fileElement) { // defined in DOM
            const file = imageVariables.fileElement.files?.[0]

            if (file instanceof Blob) {
              try {
                isFileAnImage(file)
                const reader = new FileReader()
                reader.onload = e => {
                  if (imageVariables.previewImage && imageVariables.serverImage) { // defined in DOM
                    if (typeof e.target?.result === 'string') { // is not an ArrayBuffer so we may continue
                      imageVariables.previewImage.src = e.target.result
                      imageVariables.previewImage.style.display = 'block'
                      imageVariables.serverImage.style.display = 'none'
                    }
                  }
                }
                reader.readAsDataURL(file) // triggers onload fn above
              } catch (e) {
                if (e instanceof IsFileAnImageError) {
                  imageVariables.fileElement.value = ''
                  showToast({ type: 'error', items: [e.toString()] })
                }
              }
            }
          }
        }
      }
    })
  }

  return imageVariables
}


type ImageVariables = {
  fileElement ?: HTMLInputElement,
  previewImage ?: HTMLImageElement,
  serverImage ?: HTMLImageElement,
  onFileSelected ?: () => void,
}
