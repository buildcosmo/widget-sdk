import { requestWithCallbackId } from './request.js';

export async function getWidgetId(): Promise<string> {
  return requestWithCallbackId('getWidgetId');
}
