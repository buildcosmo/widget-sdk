import './style.css'

export default function widget(preferences: Record<string, any>, widgetData?: Record<string, any>): void {
  const root = ensureRoot();
  root.innerHTML = '';

  if (preferences?.hideBackground) {
    root.classList.add('hide-background');
  } else {
    root.classList.remove('hide-background');
  }

  const header = document.createElement('div');
  header.className = 'w-full h-5';

  const content = document.createElement('div');
  content.className = 'w-full h-[calc(100%-20px)] box-border p-4';
  
  const prefsLabel = document.createElement('div');
  prefsLabel.className = 'text-xs font-medium mb-1 text-black/60';
  prefsLabel.textContent = 'preferences:';
  const prefsPre = document.createElement('pre');
  prefsPre.className = 'bg-black/5 p-3 rounded-md overflow-auto text-[11px] mb-4';
  prefsPre.textContent = JSON.stringify(preferences, null, 2);
  
  const dataLabel = document.createElement('div');
  dataLabel.className = 'text-xs font-medium mb-1 text-black/60';
  dataLabel.textContent = 'widgetData:';
  const dataPre = document.createElement('pre');
  dataPre.className = 'bg-black/5 p-3 rounded-md overflow-auto text-[11px] mb-4';
  dataPre.textContent = JSON.stringify(widgetData, null, 2);
  
  content.appendChild(prefsLabel);
  content.appendChild(prefsPre);
  content.appendChild(dataLabel);
  content.appendChild(dataPre);

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
