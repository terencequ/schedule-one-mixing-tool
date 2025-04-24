import {EffectType} from './effect-type';
import {ProductType} from './product-type';

export interface Product {
  name: string;
  startingEffects: EffectType[],
  basePrice: number,
}

export type ProductWithId = Product & {id: ProductType};
