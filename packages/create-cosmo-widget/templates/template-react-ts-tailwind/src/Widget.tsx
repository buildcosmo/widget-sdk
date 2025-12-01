import { useEffect } from 'react'

interface WidgetProps {
  preferences: Record<string, any>;
  widgetData?: Record<string, any>;
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
    <div className="w-full h-full">
      <div className="w-full h-5" />
      <div className="w-full h-[calc(100%-20px)] box-border p-4">
        <div className="text-xs font-medium mb-1 text-black/60">preferences:</div>
        <pre className="bg-black/5 p-3 rounded-md overflow-auto text-[11px] mb-4">{JSON.stringify(preferences, null, 2)}</pre>
        <div className="text-xs font-medium mb-1 text-black/60">widgetData:</div>
        <pre className="bg-black/5 p-3 rounded-md overflow-auto text-[11px] mb-4">{JSON.stringify(widgetData, null, 2)}</pre>
      </div>
    </div>
  )
}
