import React from 'react'

export type WebComponentProps<T extends HTMLElement> = React.HTMLAttributes<T> & {
  ref?: React.Ref<T>
  htmlFor?: string
  className?: string
}

const createWebComponent = <T extends HTMLElement = HTMLElement>(tagName: string) => {
  const WebComponent = ({ ref, htmlFor, className, children, ...rest }: WebComponentProps<T>) => {
    return React.createElement(
      tagName,
      {
        ref,
        ...(htmlFor ? { for: htmlFor } : {}),
        className,
        ...rest,
      },
      children,
    )
  }

  return WebComponent
}

export const WCDTaskbar = createWebComponent('d-taskbar')
export const WCDDesktop = createWebComponent('d-desktop')
export const WCDWindow = createWebComponent('d-window')
export const WCDWindowHeader = createWebComponent('d-window-header')
export const WCDWindowBody = createWebComponent('d-window-body')
export const WCDContainer = createWebComponent('d-container')
export const WCDMarkdown = createWebComponent('d-markdown')
export const WCDImage = createWebComponent('d-image')
export const WCDTypingText = createWebComponent('d-typing-text')
export const WCDPerspectiveIcon = createWebComponent('d-perspective-icon')
