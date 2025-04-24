import {EffectType} from '../models/effect-type';
import {Effect, EffectWithId} from '../models/effect';
import {IngredientType} from '../models/ingredient-type';
import {IngredientsDictionary} from './ingredients';


export const EffectsDictionary: { [key in EffectType]: Effect } = {
  [EffectType.AntiGravity]: {
    name: "Anti-Gravity",
    multiplier: 0.54,
    color: "rgb(35, 91, 203)"
  },
  [EffectType.Athletic]: {
    name: "Athletic",
    multiplier: 0.32,
    color: "rgb(117, 200, 253)"
  },
  [EffectType.Balding]: {
    name: "Balding",
    multiplier: 0.3,
    color: "rgb(199, 146, 50)"
  },
  [EffectType.BrightEyed]: {
    name: "Bright-Eyed",
    multiplier: 0.4,
    color: "rgb(190, 247, 253)"
  },
  [EffectType.Calming]: {
    name: "Calming",
    multiplier: 0.10,
    color: "rgb(254, 208, 155)"
  },
  [EffectType.CalorieDense]: {
    name: "Calorie-Dense",
    multiplier: 0.28,
    color: "rgb(254, 132, 244)"
  },
  [EffectType.Cyclopean]: {
    name: "Cyclopean",
    multiplier: 0.56,
    color: "rgb(254, 193, 116)"
  },
  [EffectType.Disorienting]: {
    name: "Disorienting",
    multiplier: 0.00,
    color: "rgb(254, 117, 81)"
  },
  [EffectType.Electrifying]: {
    name: "Electrifying",
    multiplier: 0.5,
    color: "rgb(85, 200, 253)"
  },
  [EffectType.Energizing]: {
    name: "Energizing",
    multiplier: 0.22,
    color: "rgb(154, 254, 109)"
  },
  [EffectType.Euphoric]: {
    name: "Euphoric",
    multiplier: 0.18,
    color: "rgb(254, 234, 116)"
  },
  [EffectType.Explosive]: {
    name: "Explosive",
    multiplier: 0.00,
    color: "rgb(254, 75, 64)"
  },
  [EffectType.Focused]: {
    name: "Focused",
    multiplier: 0.16,
    color: "rgb(117, 241, 253)"
  },
  [EffectType.Foggy]: {
    name: "Foggy",
    multiplier: 0.36,
    color: "rgb(176, 176, 175)"
  },
  [EffectType.Gingeritis]: {
    name: "Gingeritis",
    multiplier: 0.2,
    color: "rgb(254, 136, 41)"
  },
  [EffectType.Glowing]: {
    name: "Glowing",
    multiplier: 0.48,
    color: "rgb(133, 228, 89)"
  },
  [EffectType.Jennerising]: {
    name: "Jennerising",
    multiplier: 0.42,
    color: "rgb(254, 141, 248)"
  },
  [EffectType.Laxative]: {
    name: "Laxative",
    multiplier: 0.00,
    color: "rgb(118, 60, 37)"
  },
  [EffectType.LongFaced]: {
    name: "Long Faced",
    multiplier: 0.52,
    color: "rgb(254, 217, 97)"
  },
  [EffectType.Munchies]: {
    name: "Munchies",
    multiplier: 0.12,
    color: "rgb(201, 110, 87)"
  },
  [EffectType.Paranoia]: {
    name: "Paranoia",
    multiplier: 0.00,
    color: "rgb(196, 103, 98)"
  },
  [EffectType.Refreshing]: {
    name: "Refreshing",
    multiplier: 0.14,
    color: "rgb(178, 254, 152)"
  },
  [EffectType.Schizophrenia]: {
    name: "Schizophrenia",
    multiplier: 0.00,
    color: "rgb(100, 90, 253)"
  },
  [EffectType.Sedating]: {
    name: "Sedating",
    multiplier: 0.26,
    color: "rgb(107, 95, 216)"
  },
  [EffectType.SeizureInducing]: {
    name: "Seizure-Inducing",
    multiplier: 0.00,
    color: "rgb(254, 233, 0)"
  },
  [EffectType.Shrinking]: {
    name: "Shrinking",
    multiplier: 0.6,
    color: "rgb(182, 254, 218)"
  },
  [EffectType.Slippery]: {
    name: "Slippery",
    multiplier: 0.34,
    color: "rgb(162, 223, 253)"
  },
  [EffectType.Smelly]: {
    name: "Smelly",
    multiplier: 0.00,
    color: "rgb(125, 188, 49)"
  },
  [EffectType.Sneaky]: {
    name: "Sneaky",
    multiplier: 0.24,
    color: "rgb(123, 123, 123)"
  },
  [EffectType.Spicy]: {
    name: "Spicy",
    multiplier: 0.38,
    color: "rgb(254, 107, 76)"
  },
  [EffectType.ThoughtProvoking]: {
    name: "Thought-Provoking",
    multiplier: 0.44,
    color: "rgb(254, 160, 203)"
  },
  [EffectType.Toxic]: {
    name: "Toxic",
    multiplier: 0.00,
    color: "rgb(95, 154, 49)"
  },
  [EffectType.TropicThunder]: {
    name: "Tropic Thunder",
    multiplier: 0.46,
    color: "rgb(254, 159, 71)"
  },
  [EffectType.Zombifying]: {
    name: "Zombifying",
    multiplier: 0.58,
    color: "rgb(113, 171, 93)"
  }
}
export function getEffects(): EffectWithId[] {
  const effectTypes = Object.keys(EffectsDictionary);
  return effectTypes.map(typeStr => {
    const type = Number(typeStr) as EffectType;
    const effect = EffectsDictionary[type];
    return {
      id: type,
      ...effect
    }
  }).sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => b.multiplier - a.multiplier)
}
export const Effects = getEffects();
