import type { ShowToastProps } from '$lib/types/all'


let wrapper: HTMLElement | null


export function showToast({ type, items }: ShowToastProps) {
  if (!wrapper) wrapper = document.getElementById('toast-wrapper')

  function removeToast(toast: HTMLElement) {
    if (toast && wrapper) {
      toast.classList.add('hide')
      toast.style.marginBottom = `-${toast.offsetHeight }px`

      setTimeout(() => {
        wrapper?.removeChild(toast)
      }, 810)
    }
  }

  if (!window.closeToast) {
    window.closeToast = (toast: HTMLElement) => {
      removeToast(toast)
    }
  }

  if (wrapper) {
    let icon
    const id = crypto.randomUUID()
    const inner = items.length === 1 ? 
      `<span>${items[0]}</span>` :
      `<ul>${items.map(item => `<li>${item}</li>`).join('') }</ul>`

    switch (type) {
      case 'success':
        icon = '<svg class="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>'
        break
      case 'info':
        icon = '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M12 17q.425 0 .713-.288Q13 16.425 13 16v-4.025q0-.425-.287-.7Q12.425 11 12 11t-.712.287Q11 11.575 11 12v4.025q0 .425.288.7q.287.275.712.275Zm0-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>'
        break
    }

    wrapper.insertAdjacentHTML('beforeend', `
      <div id="${ id }" class="toast ${ type }">
        <div class="icon-wrapper">${ icon }</div>
        ${ inner }
        <button class="close">
          <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    `)

    const toast = document.getElementById(id)
    const button = toast?.querySelector('button') 

    if (toast && button) {
      button.addEventListener('click', () => {
        window.closeToast(toast)
      })

      setTimeout(() => {
        removeToast(toast)
      }, 9000)
    }
  }
}
