import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Widget from './Widget.tsx'
import './style.css'



const preferences: Record<string, any> = {
  styles: {}
};

const widgetData: Record<string, any> = {};

import { Root } from 'react-dom/client';

let root: Root | null = null;

declare global {
  interface Window {
    widget: (prefs: Record<string, any>, data: Record<string, any>) => void;
  }
}

function createRootElement(): HTMLElement {
  const el = document.createElement('div');
  el.id = 'widget-root';
  document.body.appendChild(el);
  return el;
}

// Assign to window immediately as function expression to ensure it's available synchronously
window.widget = function widget(prefs: Record<string, any>, data: Record<string, any>): void {
  const container = document.getElementById('widget-root') || createRootElement();
  
  if (!root) {
    root = createRoot(container);
  }

  root.render(
    <StrictMode>
      <Widget preferences={prefs} widgetData={data} />
    </StrictMode>
  );
};

if (import.meta.env.DEV && !window.webkit) {
  window.widget(preferences, widgetData);
}
