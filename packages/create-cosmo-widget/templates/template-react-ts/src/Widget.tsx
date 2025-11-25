

interface WidgetProps {
  preferences: Record<string, any>;
  widgetData: Record<string, any>;
}

export default function Widget({ preferences, widgetData }: WidgetProps) {
  return (
    <div>
      <div className="header"></div>
      <div className="content">
        Your widget content goes here.
      </div>
    </div>
  )
}
