import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'

const preferences = {
  "defaultWidth": 300,
  "defaultHeight": 300,
  "minWidth": 200,
  "minHeight": 200,
  "allowResize": true,
  "keepAspectRatio": false,
  "styles": {}
};

const widgetData = "";

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
widget(preferences, widgetData);
