declare global { // Node global types
  interface Window { // Browser window types
    closeToast: (toast: HTMLElement) => void // For /$lib/util/toast.ts
  }
}

export type ShowToastProps = { type: 'info' | 'success', items: string[] }
