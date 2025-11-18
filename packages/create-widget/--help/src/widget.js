import './style.css'

export default function widget(preferences, widgetData) {
  const root = ensureRoot();
  root.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'header';

  const content = document.createElement('div');
  content.className = 'content';
  content.textContent = 'Your widget content goes here.';

  root.appendChild(header);
  root.appendChild(content);
}

function ensureRoot() {
  let el = document.querySelector('#widget-root');
  if (!el) {
    el = document.createElement('div');
    el.id = 'widget-root';
    document.body.appendChild(el);
  }
  return el;
}

