import { requestWithCallbackId } from '../core/request.js';
import { CalendarInfo } from './types.js';

export async function getCalendars(): Promise<CalendarInfo[]> {
  return requestWithCallbackId('getCalendars');
}