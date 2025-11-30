import { createApp, App as VueApp } from 'vue'
import './style.css'
import Widget from './Widget.vue'

let appInstance: VueApp | null = null;

declare global {
  interface Window {
    widget: (preferences: Record<string, any>, widgetData: string | Record<string, any>) => void;
  }
}

function widget(preferences: Record<string, any>, widgetData: string | Record<string, any>): void {
  const container = document.getElementById('widget-root') || createRootElement();
  
  if (appInstance) {
    appInstance.unmount();
  }
  
  appInstance = createApp(Widget, {
    preferences: preferences || {},
    widgetData: widgetData || null
  });
  
  appInstance.mount(container);
}

function createRootElement(): HTMLElement {
  const el = document.createElement('div');
  el.id = 'widget-root';
  document.body.appendChild(el);
  return el;
}

// Assign to window immediately to ensure it's available when native app calls it
window.widget = widget;

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
