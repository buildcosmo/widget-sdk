
import './style.css'



export default function widget(preferences: Record<string, any>, widgetData: Record<string, any>): void {
  const root = ensureRoot();
  root.innerHTML = '';

  // Handle hideBackground preference
  if (preferences?.hideBackground) {
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

