import widget from './widget.js';
import './style.css';

window.widget = widget;

declare global {
  interface Window {
    widget: typeof widget;
  }
}

if (import.meta.env.DEV && !window.webkit) {
  widget({ theme: 'Default', hideBackground: false });
}
