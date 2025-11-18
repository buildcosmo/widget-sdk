import { requestWithCallbackId } from './request';

export async function getUserId(): Promise<string> {
  return requestWithCallbackId('getUserId');
}
