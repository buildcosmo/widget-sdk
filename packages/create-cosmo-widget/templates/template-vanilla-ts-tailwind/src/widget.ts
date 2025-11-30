import './style.css'

interface WidgetPreferences {
  defaultWidth: number;
  defaultHeight: number;
  minWidth: number;
  minHeight: number;
  allowResize: boolean;
  keepAspectRatio: boolean;
  styles: Record<string, unknown>;
}

export default function widget(preferences: WidgetPreferences, widgetData: string): void {
  const root = ensureRoot();
  root.innerHTML = '';

  // Handle hideBackground preference
  if ((preferences as any)?.hideBackground) {
    root.classList.add('hide-background');
  } else {
    root.classList.remove('hide-background');
  }

  const header = document.createElement('div');
  header.className = 'header';

  const content = document.createElement('div');
  content.className = 'content';
  content.textContent = 'Your widget content goes here.';

  root.appendChild(header);
  root.appendChild(content);
}

function ensureRoot(): HTMLDivElement {
  let el = document.querySelector<HTMLDivElement>('#widget-root');
  if (!el) {
    el = document.createElement('div');
    el.id = 'widget-root';
    document.body.appendChild(el);
  }
  return el;
}

