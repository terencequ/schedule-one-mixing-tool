import {EffectType} from './effect-type';

export interface Effect {
  name: string;
  multiplier: number;
  color: string;
}

export type EffectWithId = Effect & {id: EffectType};
