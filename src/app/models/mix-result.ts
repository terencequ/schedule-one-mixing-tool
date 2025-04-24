import {EffectWithId} from './effect';
import {ProductWithId} from './product';
import {IngredientWithId} from './ingredient';

export interface MixResult {
  product: ProductWithId,
  ingredients: IngredientWithId[],
  effects: EffectWithId[],
  totalMultiplier: number,
  totalRevenue: number,
  totalCost: number,
  totalProfit: number,
}
