import widget from './widget.js';
import './style.css';

window.widget = widget;

if (import.meta.env.DEV && !window.webkit) {
    widget({
        "defaultWidth": 300,
        "defaultHeight": 300,
        "minWidth": 200,
        "minHeight": 200,
        "allowResize": true,
        "keepAspectRatio": false,
        "styles": {}
    }, "");
}

