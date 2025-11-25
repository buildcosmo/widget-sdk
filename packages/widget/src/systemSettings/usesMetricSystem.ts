import { requestWithCallbackId } from '../core/request.js';

export async function usesMetricSystem(): Promise<boolean> {
  return requestWithCallbackId('usesMetricSystem');
}
