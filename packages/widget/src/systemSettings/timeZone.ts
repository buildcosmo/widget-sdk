import { requestWithCallbackId } from '../core/request';
import type { CosmoTimeZone } from './types';

export async function timeZone(): Promise<CosmoTimeZone> {
  return requestWithCallbackId('timeZone');
}

