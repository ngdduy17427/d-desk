import React from "react";

export interface IWebComponent
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  htmlFor?: string;
  className?: string;
}

const createWebComponent = (name: string, type: string) => {
  if (typeof window !== "undefined" && !window.customElements.get(type))
    window.customElements.define(
      type,
      class extends HTMLElement {
        constructor() {
          super();
        }
      }
    );

  const WebComponent = React.forwardRef<HTMLElement, IWebComponent>(
    ({ htmlFor, className, ...props }, ref): JSX.Element =>
      React.createElement(
        type,
        {
          ref: ref,
          for: htmlFor,
          class: className,
          ...props,
        },
        props.children
      )
  );

  WebComponent.displayName = name;

  return WebComponent;
};

export const WCDTaskbar = createWebComponent("WCDTaskbar", "d-taskbar");
export const WCDDesktop = createWebComponent("WCDDesktop", "d-desktop");
export const WCDWindow = createWebComponent("WCDWindow", "d-window");
export const WCDWindowHeader = createWebComponent("WCDWindow", "d-window-header");
export const WCDWindowBody = createWebComponent("WCDWindow", "d-window-body");
export const WCDContainer = createWebComponent("WCDContainer", "d-container");
export const WCDMarkdown = createWebComponent("WCDMarkdown", "d-markdown");
export const WCDImage = createWebComponent("WCDImage", "d-image");
export const WCDIcon = createWebComponent("WCDImage", "d-icon");
