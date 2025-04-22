import {EffectType} from './effect-type';

export interface Product {
  name: string;
  startingEffects: EffectType[],
  basePrice: number,
}
