import {EffectType} from '../models/effect-type';

export function getEffectTransformerDictionaryAsArray(dictionary: {[key in EffectType]?: EffectType}): {from: EffectType, to: EffectType}[] {
  const effectTypes = Object.keys(dictionary).map(key => Number(key) as EffectType);
  return effectTypes.filter(effectType => dictionary[effectType]).map((effectType) => ({from: effectType, to: dictionary[effectType]!}));
}
