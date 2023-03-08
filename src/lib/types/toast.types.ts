declare global { // Node global types
  interface Window { // Browser window types
    closeToast: (toast: HTMLElement) => void // For /$lib/util/toast.ts
  }
}

export {}
