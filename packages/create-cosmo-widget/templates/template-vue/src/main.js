import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

window.widget = (config, root) => {
    const app = createApp(App, {
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

if (import.meta.env.DEV && !window.webkit) {
    window.widget({
        "defaultWidth": 300,
        "defaultHeight": 300,
        "minWidth": 200,
        "minHeight": 200,
        "allowResize": true,
        "keepAspectRatio": false,
        "styles": {}
    }, "#widget-root");
}
