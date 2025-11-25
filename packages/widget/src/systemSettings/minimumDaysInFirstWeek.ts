import { requestWithCallbackId } from '../core/request.js';

export async function minimumDaysInFirstWeek(): Promise<number> {
  return requestWithCallbackId('minimumDaysInFirstWeek');
}

