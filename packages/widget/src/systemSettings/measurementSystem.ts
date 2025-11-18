import { requestWithCallbackId } from '../core/request';
import type { MeasurementSystem } from './types';

export async function measurementSystem(): Promise<MeasurementSystem> {
  return requestWithCallbackId('measurementSystem');
}
