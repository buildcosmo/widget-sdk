import { StrictMode } from 'react'
import { createRoot, Root } from 'react-dom/client'
import Widget from './Widget.tsx'
import './style.css'

let root: Root | null = null;

declare global {
  interface Window {
    widget: (preferences: Record<string, any>, widgetData?: Record<string, any>) => void;
  }
}

function createRootElement(): HTMLElement {
  const el = document.createElement('div');
  el.id = 'widget-root';
  document.body.appendChild(el);
  return el;
}

window.widget = function widget(preferences: Record<string, any>, widgetData?: Record<string, any>): void {
  const container = document.getElementById('widget-root') || createRootElement();
  
  if (!root) {
    root = createRoot(container);
  }

  root.render(
    <StrictMode>
      <Widget preferences={preferences} widgetData={widgetData} />
    </StrictMode>
  );
};

// In dev mode, simulate first load (widgetData is undefined)
if (import.meta.env.DEV && !window.webkit) {
  window.widget({
    "theme": "Default",
    "hideBackground": false
  });
}
