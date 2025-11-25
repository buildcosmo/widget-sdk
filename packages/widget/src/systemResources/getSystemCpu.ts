import { requestWithCallbackId } from '../core/request.js';

export async function getSystemCpu(): Promise<any> {
  return requestWithCallbackId('getSystemCpu');
}