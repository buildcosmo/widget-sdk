import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'

const preferences = {
  "theme": "Default",
  "hideBackground": false
};

const widgetData = {};

let root = null;

function widget(prefs, data) {
  const container = document.getElementById('widget-root') || createRootElement();
  
  if (!root) {
    root = createRoot(container);
  }

  root.render(
    <StrictMode>
      <App preferences={prefs} widgetData={data} />
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

if (import.meta.env.DEV && !window.webkit) {
  widget(preferences, widgetData);
}
