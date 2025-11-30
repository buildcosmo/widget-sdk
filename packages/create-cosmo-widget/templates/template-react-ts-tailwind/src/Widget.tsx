import { useEffect } from 'react'

interface WidgetProps {
  preferences: Record<string, any>;
  widgetData: string | Record<string, any>;
}

export default function Widget({ preferences, widgetData }: WidgetProps) {
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
        <h2>Preferences</h2>
        <pre>{JSON.stringify(preferences, null, 2)}</pre>
        <h2>Widget Data</h2>
        <pre>{JSON.stringify(widgetData, null, 2)}</pre>
      </div>
    </div>
  )
}
