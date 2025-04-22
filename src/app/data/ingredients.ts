import {IngredientType} from '../models/ingredient-type';
import {Ingredient} from '../models/ingredient';
import {EffectType} from '../models/effect-type';
import {LevelType} from '../models/level-type';

export const IngredientsDictionary: { [key in IngredientType]: Ingredient } = {
  [IngredientType.Cuke]: {
    name: "Cuke",
    effect: EffectType.Energizing,
    effectTransformers: [
      {from: EffectType.Euphoric, to: EffectType.Laxative},
      {from: EffectType.Foggy, to: EffectType.Cyclopean},
      {from: EffectType.Gingeritis, to: EffectType.ThoughtProvoking},
      {from: EffectType.Munchies, to: EffectType.Athletic},
      {from: EffectType.Slippery, to: EffectType.Munchies},
      {from: EffectType.Sneaky, to: EffectType.Paranoia},
      {from: EffectType.Toxic, to: EffectType.Euphoric}
    ],
    price: 2,
    level: LevelType.StreetRatI
  },
  [IngredientType.FluMedicine]: {
    name: "Flu Medicine",
    effect: EffectType.Sedating,
    effectTransformers: [
      {from: EffectType.Athletic, to: EffectType.Munchies},
      {from: EffectType.Calming, to: EffectType.BrightEyed},
      {from: EffectType.Cyclopean, to: EffectType.Foggy},
      {from: EffectType.Electrifying, to: EffectType.Refreshing},
      {from: EffectType.Euphoric, to: EffectType.Toxic},
      {from: EffectType.Focused, to: EffectType.Calming},
      {from: EffectType.Laxative, to: EffectType.Euphoric},
      {from: EffectType.Munchies, to: EffectType.Slippery},
      {from: EffectType.Shrinking, to: EffectType.Paranoia},
      {from: EffectType.ThoughtProvoking, to: EffectType.Gingeritis},
    ],
    price: 5,
    level: LevelType.HoodlumIV
  },
  [IngredientType.Gasoline]: {
    name: "Gasoline",
    effect: EffectType.Toxic,
    effectTransformers: [
      {from: EffectType.Disorienting, to: EffectType.Glowing},
      {from: EffectType.Electrifying, to: EffectType.Disorienting},
      {from: EffectType.Energizing, to: EffectType.Cyclopean},
      {from: EffectType.Euphoric, to: EffectType.Spicy},
      {from: EffectType.Gingeritis, to: EffectType.Smelly},
      {from: EffectType.Jennerising, to: EffectType.Sneaky},
      {from: EffectType.Laxative, to: EffectType.Foggy},
      {from: EffectType.Munchies, to: EffectType.Sedating},
      {from: EffectType.Paranoia, to: EffectType.Calming},
      {from: EffectType.Shrinking, to: EffectType.Focused},
      {from: EffectType.Sneaky, to: EffectType.TropicThunder},
    ],
    price: 5,
    level: LevelType.HoodlumV
  },
  [IngredientType.Donut]: {
    name: "Donut",
    effect: EffectType.CalorieDense,
    effectTransformers: [
      {from: EffectType.AntiGravity, to: EffectType.Slippery},
      {from: EffectType.Balding, to: EffectType.Sneaky},
      {from: EffectType.CalorieDense, to: EffectType.Explosive},
      {from: EffectType.Focused, to: EffectType.Euphoric},
      {from: EffectType.Jennerising, to: EffectType.Gingeritis},
      {from: EffectType.Munchies, to: EffectType.Calming},
      {from: EffectType.Shrinking, to: EffectType.Energizing}
    ],
    price: 3,
    level: LevelType.StreetRatI
  },
  [IngredientType.EnergyDrink]: {
    name: "Energy Drink",
    effect: EffectType.Athletic,
    effectTransformers: [
      {from: EffectType.Disorienting, to: EffectType.Electrifying},
      {from: EffectType.Euphoric, to: EffectType.Energizing},
      {from: EffectType.Focused, to: EffectType.Shrinking},
      {from: EffectType.Foggy, to: EffectType.Laxative},
      {from: EffectType.Glowing, to: EffectType.Disorienting},
      {from: EffectType.Schizophrenia, to: EffectType.Balding},
      {from: EffectType.Sedating, to: EffectType.Munchies},
      {from: EffectType.Spicy, to: EffectType.Euphoric},
      {from: EffectType.TropicThunder, to: EffectType.Sneaky}
    ],
    price: 6,
    level: LevelType.PeddlerI
  },
  [IngredientType.MouthWash]: {
    name: "Mouth Wash",
    effect: EffectType.Balding,
    effectTransformers: [
      {from: EffectType.Calming, to: EffectType.AntiGravity},
      {from: EffectType.CalorieDense, to: EffectType.Sneaky},
      {from: EffectType.Explosive, to: EffectType.Sedating},
      {from: EffectType.Focused, to: EffectType.Jennerising},
    ],
    price: 4,
    level: LevelType.HoodlumIII
  },
  [IngredientType.MotorOil]: {
    name: "Motor Oil",
    effect: EffectType.Slippery,
    effectTransformers: [
      {from: EffectType.Energizing, to: EffectType.Munchies},
      {from: EffectType.Euphoric, to: EffectType.Sedating},
      {from: EffectType.Foggy, to: EffectType.Toxic},
      {from: EffectType.Munchies, to: EffectType.Schizophrenia},
      {from: EffectType.Paranoia, to: EffectType.AntiGravity},
    ],
    price: 6,
    level: LevelType.PeddlerII
  },
  [IngredientType.Banana]: {
    name: "Banana",
    effect: EffectType.Gingeritis,
    effectTransformers: [
      {from: EffectType.Calming, to: EffectType.Sneaky},
      {from: EffectType.Cyclopean, to: EffectType.Energizing},
      {from: EffectType.Disorienting, to: EffectType.Focused},
      {from: EffectType.Energizing, to: EffectType.ThoughtProvoking},
      {from: EffectType.Focused, to: EffectType.SeizureInducing},
      {from: EffectType.LongFaced, to: EffectType.Refreshing},
      {from: EffectType.Paranoia, to: EffectType.Jennerising},
      {from: EffectType.Smelly, to: EffectType.AntiGravity},
      {from: EffectType.Toxic, to: EffectType.Smelly},
    ],
    price: 2,
    level: LevelType.StreetRatI
  },
  [IngredientType.Chili]: {
    name: "Chili",
    effect: EffectType.Spicy,
    effectTransformers: [
      {from: EffectType.AntiGravity, to: EffectType.TropicThunder},
      {from: EffectType.Athletic, to: EffectType.Euphoric},
      {from: EffectType.Laxative, to: EffectType.LongFaced},
      {from: EffectType.Munchies, to: EffectType.Toxic},
      {from: EffectType.Shrinking, to: EffectType.Refreshing},
      {from: EffectType.Sneaky, to: EffectType.BrightEyed},
    ],
    price: 7,
    level: LevelType.PeddlerIV
  },
  [IngredientType.Iodine]: {
    name: "Iodine",
    effect: EffectType.Jennerising,
    effectTransformers: [
      {from: EffectType.Calming, to: EffectType.Balding},
      {from: EffectType.CalorieDense, to: EffectType.Gingeritis},
      {from: EffectType.Euphoric, to: EffectType.SeizureInducing},
      {from: EffectType.Foggy, to: EffectType.Paranoia},
      {from: EffectType.Refreshing, to: EffectType.ThoughtProvoking},
      {from: EffectType.Toxic, to: EffectType.Sneaky},
    ],
    price: 8,
    level: LevelType.HustlerI
  },
  [IngredientType.Paracetamol]: {
    name: "Paracetamol",
    effect: EffectType.Sneaky,
    effectTransformers: [
      {from: EffectType.Calming, to: EffectType.Slippery},
      {from: EffectType.Electrifying, to: EffectType.Athletic},
      {from: EffectType.Energizing, to: EffectType.Paranoia},
      {from: EffectType.Focused, to: EffectType.Gingeritis},
      {from: EffectType.Foggy, to: EffectType.Calming},
      {from: EffectType.Glowing, to: EffectType.Toxic},
      {from: EffectType.Munchies, to: EffectType.AntiGravity},
      {from: EffectType.Paranoia, to: EffectType.Balding},
      {from: EffectType.Spicy, to: EffectType.BrightEyed},
      {from: EffectType.Toxic, to: EffectType.TropicThunder},
    ],
    price: 3,
    level: LevelType.StreetRatI
  },
  [IngredientType.Viagra]: {
    name: "Viagra",
    effect: EffectType.TropicThunder,
    effectTransformers: [
      {from: EffectType.Athletic, to: EffectType.Sneaky},
      {from: EffectType.Disorienting, to: EffectType.Toxic},
      {from: EffectType.Euphoric, to: EffectType.BrightEyed},
      {from: EffectType.Laxative, to: EffectType.Calming},
      {from: EffectType.Shrinking, to: EffectType.Gingeritis},
    ],
    price: 4,
    level: LevelType.HoodlumII
  },
  [IngredientType.HorseSemen]: {
    name: "Horse Semen",
    effect: EffectType.LongFaced,
    effectTransformers: [
      {from: EffectType.AntiGravity, to: EffectType.Calming},
      {from: EffectType.Gingeritis, to: EffectType.Refreshing},
      {from: EffectType.SeizureInducing, to: EffectType.Energizing},
      {from: EffectType.ThoughtProvoking, to: EffectType.Electrifying},
    ],
    price: 9,
    level: LevelType.HustlerIII
  },
  [IngredientType.MegaBean]: {
    name: "Mega Bean",
    effect: EffectType.Foggy,
    effectTransformers: [
      {from: EffectType.Athletic, to: EffectType.Laxative},
      {from: EffectType.Calming, to: EffectType.Glowing},
      {from: EffectType.Energizing, to: EffectType.Cyclopean},
      {from: EffectType.Focused, to: EffectType.Disorienting},
      {from: EffectType.Jennerising, to: EffectType.Paranoia},
      {from: EffectType.SeizureInducing, to: EffectType.Focused},
      {from: EffectType.Shrinking, to: EffectType.Electrifying},
      {from: EffectType.Slippery, to: EffectType.Toxic},
      {from: EffectType.Sneaky, to: EffectType.Calming},
      {from: EffectType.ThoughtProvoking, to: EffectType.Energizing},
    ],
    price: 7,
    level: LevelType.PeddlerII
  },
  [IngredientType.Addy]: {
    name: "Addy",
    effect: EffectType.ThoughtProvoking,
    effectTransformers: [
      {from: EffectType.Explosive, to: EffectType.Euphoric},
      {from: EffectType.Foggy, to: EffectType.Energizing},
      {from: EffectType.Glowing, to: EffectType.Refreshing},
      {from: EffectType.LongFaced, to: EffectType.Electrifying},
      {from: EffectType.Sedating, to: EffectType.Gingeritis},
    ],
    price: 9,
    level: LevelType.HustlerII
  },
  [IngredientType.Battery]: {
    name: "Battery",
    effect: EffectType.BrightEyed,
    effectTransformers: [
      {from: EffectType.Cyclopean, to: EffectType.Glowing},
      {from: EffectType.Electrifying, to: EffectType.Euphoric},
      {from: EffectType.Euphoric, to: EffectType.Zombifying},
      {from: EffectType.Laxative, to: EffectType.CalorieDense},
      {from: EffectType.Munchies, to: EffectType.TropicThunder},
      {from: EffectType.Shrinking, to: EffectType.Munchies},
    ],
    price: 8,
    level: LevelType.PeddlerV
  }
}
export function getIngredients() {
  const ingredientTypes = Object.keys(IngredientsDictionary);
  return ingredientTypes.map(typeStr => {
    const type = Number(typeStr) as IngredientType;
    const ingredient = IngredientsDictionary[type];
    return {
      id: type,
      ...ingredient
    }
  }).sort((a, b) => a.price - b.price).sort((a, b) => a.level.valueOf() - b.level.valueOf())
}
export const Ingredients = getIngredients();
