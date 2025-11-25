import { requestWithCallbackId } from '../core/request.js';
import type { CosmoTimeZone } from './types.js';

export async function timeZone(): Promise<CosmoTimeZone> {
  return requestWithCallbackId('timeZone');
}

