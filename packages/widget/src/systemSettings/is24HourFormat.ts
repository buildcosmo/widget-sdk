import { requestWithCallbackId } from '../core/request.js';

export async function is24HourFormat(): Promise<boolean> {
  return requestWithCallbackId('is24HourFormat');
}
