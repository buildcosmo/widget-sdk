import { requestWithCallbackId } from './request.js';

export async function getUserId(): Promise<string> {
  return requestWithCallbackId('getUserId');
}
