import { requestWithCallbackId } from '../core/request.js';

export async function firstWeekday(): Promise<number> {
  return requestWithCallbackId('firstWeekday');
}

