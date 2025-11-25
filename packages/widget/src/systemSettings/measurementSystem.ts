import { requestWithCallbackId } from '../core/request.js';
import type { MeasurementSystem } from './types.js';

export async function measurementSystem(): Promise<MeasurementSystem> {
  return requestWithCallbackId('measurementSystem');
}
