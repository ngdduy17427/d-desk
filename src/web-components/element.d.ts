import { IWebComponent } from "web-components";

declare namespace JSX {
  interface IntrinsicElements {
    "d-taskbar": IWebComponent;
    "d-desktop": IWebComponent;
    "d-window": IWebComponent;
    "d-window-header": IWebComponent;
    "d-window-body": IWebComponent;
    "d-container": IWebComponent;
    "d-markdown": IWebComponent;
    "d-image": IWebComponent;
    "d-text": IWebComponent;
    "d-icon": IWebComponent;
  }
}
