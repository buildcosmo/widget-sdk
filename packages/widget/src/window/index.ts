import { requestWithCallbackId } from "../core/request.js";

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        setWindowSize?: {
          postMessage: (message: any) => void;
        };
        setWindowPosition?: {
          postMessage: (message: any) => void;
        };
      };
    };
  }
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowPosition {
  x: number;
  y: number;
}

/**
 * Gets the current size of the widget window.
 * @returns A promise that resolves to the window size.
 */
export async function getWindowSize(): Promise<WindowSize> {
  return requestWithCallbackId("getWindowSize");
}

/**
 * Sets the size of the widget window.
 * @param size The new size for the window.
 */
export function setWindowSize(size: WindowSize): void {
  if (window.webkit?.messageHandlers?.setWindowSize) {
    window.webkit.messageHandlers.setWindowSize.postMessage(size);
  } else {
    console.warn("setWindowSize handler not available");
  }
}

/**
 * Gets the current position of the widget window.
 * @returns A promise that resolves to the window position.
 */
export async function getWindowPosition(): Promise<WindowPosition> {
  return requestWithCallbackId("getWindowPosition");
}

/**
 * Sets the position of the widget window.
 * @param position The new position for the window.
 */
export function setWindowPosition(position: WindowPosition): void {
  if (window.webkit?.messageHandlers?.setWindowPosition) {
    window.webkit.messageHandlers.setWindowPosition.postMessage(position);
  } else {
    console.warn("setWindowPosition handler not available");
  }
}
