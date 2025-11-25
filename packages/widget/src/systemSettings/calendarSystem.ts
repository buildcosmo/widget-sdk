import { requestWithCallbackId } from '../core/request.js';

export async function calendarSystem(): Promise<string> {
  return requestWithCallbackId('calendarSystem');
}

