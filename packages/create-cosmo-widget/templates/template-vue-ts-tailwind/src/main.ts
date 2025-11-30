import { createApp, App as VueApp } from 'vue'
import './style.css'
import Widget from './Widget.vue'

let appInstance: VueApp | null = null;

function widget(preferences: Record<string, any>, widgetData: string | Record<string, any>): void {
  const container = document.getElementById('widget-root') || createRootElement();
  
  if (appInstance) {
    appInstance.unmount();
  }
  
  appInstance = createApp(Widget, {
    preferences: preferences || {}
  });
  
  appInstance.mount(container);
}

function createRootElement(): HTMLElement {
  const el = document.createElement('div');
  el.id = 'widget-root';
  document.body.appendChild(el);
  return el;
}

window.widget = widget;

declare global {
  interface Window {
    widget: (preferences: Record<string, any>, widgetData: string | Record<string, any>) => void;
  }
}

if (import.meta.env.DEV && !(window as any).webkit) {
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
