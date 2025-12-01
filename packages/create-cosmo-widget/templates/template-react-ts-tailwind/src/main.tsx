import { StrictMode } from 'react'
import { createRoot, Root } from 'react-dom/client'
import Widget from './Widget.tsx'
import './style.css'

let root: Root | null = null;

function widget(preferences: Record<string, any>, widgetData?: Record<string, any>) {
  const container = document.getElementById('widget-root')!;
  if (!root) {
    root = createRoot(container);
  }
  root.render(
    <StrictMode>
      <Widget preferences={preferences} widgetData={widgetData} />
    </StrictMode>
  );
}

window.widget = widget;

declare global {
  interface Window {
    widget: typeof widget;
  }
}

if (import.meta.env.DEV && !window.webkit) {
  widget({ theme: 'Default', hideBackground: false });
}
