import { requestWithCallbackId } from './request';

export async function getWidgetId(): Promise<string> {
  return requestWithCallbackId('getWidgetId');
}
