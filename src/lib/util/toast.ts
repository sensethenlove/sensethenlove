export function showToast({ type, items }: { type: 'success' | 'error' | 'info', items: string[] }) {
  let icon
  const id = crypto.randomUUID()
  const wrapper = document.getElementById('toast-wrapper')

  function removeToast(id: string) {
    const child = document.getElementById(id)

    if (child && wrapper) {
      child.classList.add('hide')
      child.style.marginBottom = `-${ child.offsetHeight }px`

      setTimeout(() => {
        wrapper.removeChild(child)
      }, 999)
    }
  }

  if (!window.closeToast) {
    window.closeToast = (id) => {
      removeToast(id)
    }
  }

  if (wrapper) {
    const inner = items.length === 1 ? 
      `<span>${items[0]}</span>` :
      `<ul>${items.map(item => `<li>${item}</li>`).join('') }</ul>`

    switch (type) {
      case 'success':
        icon = '<svg class="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>'
        break
      case 'error':
        icon = '<svg class="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>'
        break
      case 'info':
        icon = '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M12 17q.425 0 .713-.288Q13 16.425 13 16v-4.025q0-.425-.287-.7Q12.425 11 12 11t-.712.287Q11 11.575 11 12v4.025q0 .425.288.7q.287.275.712.275Zm0-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>'
        break
    }

    wrapper.insertAdjacentHTML('beforeend', `
      <div id="${ id }" class="toast ${ type }">
        <div class="icon-wrapper">${ icon }</div>
        ${ inner }
        <button class="close" data-toast-button--for="${ id }">
          <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
    `)

    const button = document.querySelector(`[data-toast-button--for="${id}"]`) 

    if (button) {
      button.addEventListener('click', () => {
        window.closeToast(id)
      })
    }

    setTimeout(() => {
      removeToast(id)
    }, 9000)
  }
}
