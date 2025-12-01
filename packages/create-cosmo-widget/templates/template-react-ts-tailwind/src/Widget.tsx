import { useEffect } from 'react'

interface WidgetProps {
  preferences: Record<string, any>;
  widgetData?: Record<string, any>;  // undefined on first load, object after saving
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
        <div className="label">preferences:</div>
        <pre>{JSON.stringify(preferences, null, 2)}</pre>
        <div className="label">widgetData:</div>
        <pre>{JSON.stringify(widgetData, null, 2)}</pre>
      </div>
    </div>
  )
}
