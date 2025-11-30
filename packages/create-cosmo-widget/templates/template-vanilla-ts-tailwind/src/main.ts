import widget from './widget.js';
import './style.css';

declare global {
  interface Window {
    widget: typeof widget;
  }
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

