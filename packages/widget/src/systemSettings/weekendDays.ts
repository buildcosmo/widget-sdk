import { requestWithCallbackId } from '../core/request.js';

export async function weekendDays(): Promise<number[]> {
  return requestWithCallbackId('weekendDays');
}
