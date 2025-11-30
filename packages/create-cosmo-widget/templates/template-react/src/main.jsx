import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'

let root = null;

function widget(preferences, widgetData) {
  const container = document.getElementById('widget-root') || createRootElement();
  
  if (!root) {
    root = createRoot(container);
  }

  root.render(
    <StrictMode>
      <App preferences={preferences} widgetData={widgetData} />
    </StrictMode>
  );
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
