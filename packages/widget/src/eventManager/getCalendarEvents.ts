import { requestWithCallbackId } from '../core/request.js';

export async function getCalendarEvents(start: string, end: string): Promise<any> {
  return requestWithCallbackId('getCalendarEvents', { start, end });
}
