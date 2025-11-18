import { requestWithCallbackId } from '../core/request';

export async function calendarSystem(): Promise<string> {
  return requestWithCallbackId('calendarSystem');
}

