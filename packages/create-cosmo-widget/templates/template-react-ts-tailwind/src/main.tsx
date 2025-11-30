import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Widget from './Widget.tsx'
import './style.css'



const preferences: Record<string, any> = {
  "theme": "Default",
  "hideBackground": false
};

const widgetData: string | Record<string, any> = "";

import { Root } from 'react-dom/client';

let root: Root | null = null;

function widget(prefs: Record<string, any>, data: string | Record<string, any>): void {
  const container = document.getElementById('widget-root') || createRootElement();
  
  if (!root) {
    root = createRoot(container);
  }

  root.render(
    <StrictMode>
      <Widget preferences={prefs} widgetData={data} />
    </StrictMode>
  );
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
    widget: (prefs: Record<string, any>, data: string | Record<string, any>) => void;
  }
}

if (import.meta.env.DEV && !window.webkit) {
  widget(preferences, widgetData);
}
