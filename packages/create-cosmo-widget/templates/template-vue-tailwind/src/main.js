import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

let appInstance = null;

function widget(preferences, widgetData) {
    const container = document.getElementById('widget-root') || createRootElement();

    if (appInstance) {
        appInstance.unmount();
    }

    appInstance = createApp(App, {
        preferences,
        widgetData
    });

    appInstance.mount(container);
}

function createRootElement() {
    const el = document.createElement('div');
    el.id = 'widget-root';
    document.body.appendChild(el);
    return el;
}

window.widget = widget;

// In dev mode, simulate first load (widgetData is undefined)
if (import.meta.env.DEV && !window.webkit) {
    widget({
        "theme": "Default",
        "hideBackground": false
    });
}
