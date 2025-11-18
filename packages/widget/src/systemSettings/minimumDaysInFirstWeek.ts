import { requestWithCallbackId } from '../core/request';

export async function minimumDaysInFirstWeek(): Promise<number> {
  return requestWithCallbackId('minimumDaysInFirstWeek');
}

