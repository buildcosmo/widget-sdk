import widget from './widget.js';
import './style.css';

window.widget = widget;

if (import.meta.env.DEV && !window.webkit) {
    widget({
        "theme": "Default",
        "hideBackground": false
    }, {});
}

