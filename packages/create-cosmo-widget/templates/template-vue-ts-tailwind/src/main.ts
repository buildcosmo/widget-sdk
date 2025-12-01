import { createApp, App as VueApp } from 'vue'
import './style.css'
import Widget from './Widget.vue'

let appInstance: VueApp | null = null;

function widget(preferences: Record<string, any>, widgetData?: Record<string, any>) {
  if (appInstance) {
    appInstance.unmount();
  }
  appInstance = createApp(Widget, { preferences, widgetData });
  appInstance.mount('#widget-root');
}

window.widget = widget;

declare global {
  interface Window {
    widget: typeof widget;
  }
}

if (import.meta.env.DEV && !(window as any).webkit) {
  widget({ theme: 'Default', hideBackground: false });
}
