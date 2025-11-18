import { requestWithCallbackId } from '../core/request';

export async function weekendDays(): Promise<number[]> {
  return requestWithCallbackId('weekendDays');
}
