import { requestWithCallbackId } from '../core/request';

export async function firstWeekday(): Promise<number> {
  return requestWithCallbackId('firstWeekday');
}

