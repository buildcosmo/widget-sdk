import { requestWithCallbackId } from '../core/request';

export async function usesMetricSystem(): Promise<boolean> {
  return requestWithCallbackId('usesMetricSystem');
}
