import {EffectType} from './effect-type';
import {LevelType} from './level-type';
import {Effect} from './effect';
import {IngredientType} from './ingredient-type';

export interface Ingredient {
  name: string;
  effect: EffectType;
  effectTransformers: {from: EffectType, to: EffectType}[];
  price: number;
  level: LevelType;
}

export type IngredientWithId = Ingredient & {id: IngredientType};
