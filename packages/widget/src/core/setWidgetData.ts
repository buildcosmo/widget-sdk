/**
 * Persists widget data to native storage.
 * Data is restored as the second argument to your widget function on next load.
 * 
 * @param data - An object with string keys. Must be JSON-serializable.
 * @throws TypeError if data is not a plain object
 * 
 * @example
 * setWidgetData({ counter: 5, lastUpdated: Date.now() });
 */
export function setWidgetData(data: Record<string, unknown>): void {
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    throw new TypeError('setWidgetData requires a plain object (Record<string, any>). Arrays and primitives are not allowed.');
  }
  const json = JSON.stringify(data);
  (window as any).webkit.messageHandlers.saveWidgetData.postMessage(json);
}
