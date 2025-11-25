import { requestWithCallbackId } from '../core/request.js';

export async function getSystemMemory(): Promise<any> {
  return requestWithCallbackId('getSystemMemory');
}
