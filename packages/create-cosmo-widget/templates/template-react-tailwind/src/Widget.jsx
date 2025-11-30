import { useEffect } from 'react'

export default function Widget({ preferences, widgetData }) {
  useEffect(() => {
    const root = document.getElementById('widget-root');
    if (root) {
      if (preferences?.hideBackground) {
        root.classList.add('hide-background');
      } else {
        root.classList.remove('hide-background');
      }
    }
  }, [preferences?.hideBackground]);

  return (
    <div>
      <div className="header"></div>
      <div className="content">
        Your widget content goes here.
      </div>
    </div>
  )
}
