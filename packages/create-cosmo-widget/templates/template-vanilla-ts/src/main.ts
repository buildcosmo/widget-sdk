import widget from './widget.js';
import './style.css';

declare global {
  interface Window {
    widget: typeof widget;
  }
}

window.widget = widget;

// In dev mode, simulate first load (widgetData is undefined)
if (import.meta.env.DEV && !window.webkit) {
  widget({
    "theme": "Default",
    "hideBackground": false
  });
}

