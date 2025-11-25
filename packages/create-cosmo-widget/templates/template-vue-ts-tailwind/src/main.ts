import { createApp } from 'vue'
import './style.css'
import Widget from './Widget.vue'

declare global {
  interface Window {
    widget: (config: Record<string, any>, root: string | HTMLElement) => void;
  }
}

window.widget = (config: Record<string, any>, root: string | HTMLElement) => {
  const app = createApp(Widget, {
    preferences: config.styles || {}
  })
  
  // If root is a string selector, find the element
  const rootElement = typeof root === 'string' ? document.querySelector(root) : root
  
  if (rootElement) {
    app.mount(rootElement)
  } else {
    console.error('Widget root element not found')
  }
}
