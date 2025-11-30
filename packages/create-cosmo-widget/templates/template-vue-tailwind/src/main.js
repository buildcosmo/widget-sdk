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
        preferences: preferences || {},
        widgetData: widgetData || null
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

if (import.meta.env.DEV && !window.webkit) {
    widget({
        "defaultWidth": 300,
        "defaultHeight": 300,
        "minWidth": 200,
        "minHeight": 200,
        "allowResize": true,
        "keepAspectRatio": false,
        "styles": {}
    }, "");
}
