import {EffectType} from './effect-type';
import {LevelType} from './level-type';

export interface Ingredient {
  name: string;
  effect: EffectType;
  effectTransformers: {from: EffectType, to: EffectType}[];
  price: number;
  level: LevelType;
}
