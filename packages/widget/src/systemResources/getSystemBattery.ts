import { requestWithCallbackId } from '../core/request.js';

export async function getSystemBattery(): Promise<any> {
  return requestWithCallbackId('getSystemBattery');
}
