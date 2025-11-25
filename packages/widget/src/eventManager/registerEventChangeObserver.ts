import { registerObserver } from '../core/observers.js';

export function registerEventChangeObserver(callback: (data: any) => void): () => void {
  return registerObserver('registerEventChangeObserver', callback);
}