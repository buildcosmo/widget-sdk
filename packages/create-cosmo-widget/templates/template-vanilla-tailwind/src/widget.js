import './style.css'

export default function widget(preferences, widgetData) {
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

  const prefsTitle = document.createElement('h2');
  prefsTitle.textContent = 'Preferences';
  const prefsPre = document.createElement('pre');
  prefsPre.textContent = JSON.stringify(preferences, null, 2);

  const dataTitle = document.createElement('h2');
  dataTitle.textContent = 'Widget Data';
  const dataPre = document.createElement('pre');
  dataPre.textContent = JSON.stringify(widgetData, null, 2);

  content.appendChild(prefsTitle);
  content.appendChild(prefsPre);
  content.appendChild(dataTitle);
  content.appendChild(dataPre);

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

