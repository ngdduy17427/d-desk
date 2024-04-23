import { IWebComponent } from "web_components";

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
    "d-icon": IWebComponent;
  }
}
