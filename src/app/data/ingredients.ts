import {IngredientType} from '../models/ingredient-type';
import {Ingredient, IngredientWithId} from '../models/ingredient';
import {EffectType} from '../models/effect-type';
import {LevelType} from '../models/level-type';

export const IngredientsDictionary: { [key in IngredientType]: Ingredient } = {
  [IngredientType.Cuke]: {
    name: "Cuke",
    effect: EffectType.Energizing,
    effectTransformers: {
      [EffectType.Euphoric]: EffectType.Laxative,
      [EffectType.Foggy]: EffectType.Cyclopean,
      [EffectType.Gingeritis]: EffectType.ThoughtProvoking,
      [EffectType.Munchies]: EffectType.Athletic,
      [EffectType.Slippery]: EffectType.Munchies,
      [EffectType.Sneaky]: EffectType.Paranoia,
      [EffectType.Toxic]: EffectType.Euphoric
    },
    price: 2,
    level: LevelType.StreetRatI
  },
  [IngredientType.FluMedicine]: {
    name: "Flu Medicine",
    effect: EffectType.Sedating,
    effectTransformers: {
      [EffectType.Athletic]: EffectType.Munchies,
      [EffectType.Calming]: EffectType.BrightEyed,
      [EffectType.Cyclopean]: EffectType.Foggy,
      [EffectType.Electrifying]: EffectType.Refreshing,
      [EffectType.Euphoric]: EffectType.Toxic,
      [EffectType.Focused]: EffectType.Calming,
      [EffectType.Laxative]: EffectType.Euphoric,
      [EffectType.Munchies]: EffectType.Slippery,
      [EffectType.Shrinking]: EffectType.Paranoia,
      [EffectType.ThoughtProvoking]: EffectType.Gingeritis,
    },
    price: 5,
    level: LevelType.HoodlumIV
  },
  [IngredientType.Gasoline]: {
    name: "Gasoline",
    effect: EffectType.Toxic,
    effectTransformers: {
      [EffectType.Disorienting]: EffectType.Glowing,
      [EffectType.Electrifying]: EffectType.Disorienting,
      [EffectType.Energizing]: EffectType.Cyclopean,
      [EffectType.Euphoric]: EffectType.Spicy,
      [EffectType.Gingeritis]: EffectType.Smelly,
      [EffectType.Jennerising]: EffectType.Sneaky,
      [EffectType.Laxative]: EffectType.Foggy,
      [EffectType.Munchies]: EffectType.Sedating,
      [EffectType.Paranoia]: EffectType.Calming,
      [EffectType.Shrinking]: EffectType.Focused,
      [EffectType.Sneaky]: EffectType.TropicThunder,
    },
    price: 5,
    level: LevelType.HoodlumV
  },
  [IngredientType.Donut]: {
    name: "Donut",
    effect: EffectType.CalorieDense,
    effectTransformers: {
      [EffectType.AntiGravity]: EffectType.Slippery,
      [EffectType.Balding]: EffectType.Sneaky,
      [EffectType.CalorieDense]: EffectType.Explosive,
      [EffectType.Focused]: EffectType.Euphoric,
      [EffectType.Jennerising]: EffectType.Gingeritis,
      [EffectType.Munchies]: EffectType.Calming,
      [EffectType.Shrinking]: EffectType.Energizing,
    },
    price: 3,
    level: LevelType.StreetRatI
  },
  [IngredientType.EnergyDrink]: {
    name: "Energy Drink",
    effect: EffectType.Athletic,
    effectTransformers: {
      [EffectType.Disorienting]: EffectType.Electrifying,
      [EffectType.Euphoric]: EffectType.Energizing,
      [EffectType.Focused]: EffectType.Shrinking,
      [EffectType.Foggy]: EffectType.Laxative,
      [EffectType.Glowing]: EffectType.Disorienting,
      [EffectType.Schizophrenia]: EffectType.Balding,
      [EffectType.Sedating]: EffectType.Munchies,
      [EffectType.Spicy]: EffectType.Euphoric,
      [EffectType.TropicThunder]: EffectType.Sneaky
    },
    price: 6,
    level: LevelType.PeddlerI
  },
  [IngredientType.MouthWash]: {
    name: "Mouth Wash",
    effect: EffectType.Balding,
    effectTransformers: {
      [EffectType.Calming]: EffectType.AntiGravity,
      [EffectType.CalorieDense]: EffectType.Sneaky,
      [EffectType.Explosive]: EffectType.Sedating,
      [EffectType.Focused]: EffectType.Jennerising,
    },
    price: 4,
    level: LevelType.HoodlumIII
  },
  [IngredientType.MotorOil]: {
    name: "Motor Oil",
    effect: EffectType.Slippery,
    effectTransformers: {
      [EffectType.Energizing]: EffectType.Munchies,
      [EffectType.Euphoric]: EffectType.Sedating,
      [EffectType.Foggy]: EffectType.Toxic,
      [EffectType.Munchies]: EffectType.Schizophrenia,
      [EffectType.Paranoia]: EffectType.AntiGravity,
    },
    price: 6,
    level: LevelType.PeddlerII
  },
  [IngredientType.Banana]: {
    name: "Banana",
    effect: EffectType.Gingeritis,
    effectTransformers: {
      [EffectType.Calming]: EffectType.Sneaky,
      [EffectType.Cyclopean]: EffectType.Energizing,
      [EffectType.Disorienting]: EffectType.Focused,
      [EffectType.Energizing]: EffectType.ThoughtProvoking,
      [EffectType.Focused]: EffectType.SeizureInducing,
      [EffectType.LongFaced]: EffectType.Refreshing,
      [EffectType.Paranoia]: EffectType.Jennerising,
      [EffectType.Smelly]: EffectType.AntiGravity,
      [EffectType.Toxic]: EffectType.Smelly,
    },
    price: 2,
    level: LevelType.StreetRatI
  },
  [IngredientType.Chili]: {
    name: "Chili",
    effect: EffectType.Spicy,
    effectTransformers: {
      [EffectType.AntiGravity]: EffectType.TropicThunder,
      [EffectType.Athletic]: EffectType.Euphoric,
      [EffectType.Laxative]: EffectType.LongFaced,
      [EffectType.Munchies]: EffectType.Toxic,
      [EffectType.Shrinking]: EffectType.Refreshing,
      [EffectType.Sneaky]: EffectType.BrightEyed,
    },
    price: 7,
    level: LevelType.PeddlerIV
  },
  [IngredientType.Iodine]: {
    name: "Iodine",
    effect: EffectType.Jennerising,
    effectTransformers: {
      [EffectType.Calming]: EffectType.Balding,
      [EffectType.CalorieDense]: EffectType.Gingeritis,
      [EffectType.Euphoric]: EffectType.SeizureInducing,
      [EffectType.Foggy]: EffectType.Paranoia,
      [EffectType.Refreshing]: EffectType.ThoughtProvoking,
      [EffectType.Toxic]: EffectType.Sneaky,
    },
    price: 8,
    level: LevelType.HustlerI
  },
  [IngredientType.Paracetamol]: {
    name: "Paracetamol",
    effect: EffectType.Sneaky,
    effectTransformers: {
      [EffectType.Calming]: EffectType.Slippery,
      [EffectType.Electrifying]: EffectType.Athletic,
      [EffectType.Energizing]: EffectType.Paranoia,
      [EffectType.Focused]: EffectType.Gingeritis,
      [EffectType.Foggy]: EffectType.Calming,
      [EffectType.Glowing]: EffectType.Toxic,
      [EffectType.Munchies]: EffectType.AntiGravity,
      [EffectType.Paranoia]: EffectType.Balding,
      [EffectType.Spicy]: EffectType.BrightEyed,
      [EffectType.Toxic]: EffectType.TropicThunder,
    },
    price: 3,
    level: LevelType.StreetRatI
  },
  [IngredientType.Viagra]: {
    name: "Viagra",
    effect: EffectType.TropicThunder,
    effectTransformers: {
      [EffectType.Athletic]: EffectType.Sneaky,
      [EffectType.Disorienting]: EffectType.Toxic,
      [EffectType.Euphoric]: EffectType.BrightEyed,
      [EffectType.Laxative]: EffectType.Calming,
      [EffectType.Shrinking]: EffectType.Gingeritis,
    },
    price: 4,
    level: LevelType.HoodlumII
  },
  [IngredientType.HorseSemen]: {
    name: "Horse Semen",
    effect: EffectType.LongFaced,
    effectTransformers: {
      [EffectType.AntiGravity]: EffectType.Calming,
      [EffectType.Gingeritis]: EffectType.Refreshing,
      [EffectType.SeizureInducing]: EffectType.Energizing,
      [EffectType.ThoughtProvoking]: EffectType.Electrifying,
    },
    price: 9,
    level: LevelType.HustlerIII
  },
  [IngredientType.MegaBean]: {
    name: "Mega Bean",
    effect: EffectType.Foggy,
    effectTransformers: {
      [EffectType.Athletic]: EffectType.Laxative,
      [EffectType.Calming]: EffectType.Glowing,
      [EffectType.Energizing]: EffectType.Cyclopean,
      [EffectType.Focused]: EffectType.Disorienting,
      [EffectType.Jennerising]: EffectType.Paranoia,
      [EffectType.SeizureInducing]: EffectType.Focused,
      [EffectType.Shrinking]: EffectType.Electrifying,
      [EffectType.Slippery]: EffectType.Toxic,
      [EffectType.Sneaky]: EffectType.Calming,
      [EffectType.ThoughtProvoking]: EffectType.Energizing,
    },
    price: 7,
    level: LevelType.PeddlerII
  },
  [IngredientType.Addy]: {
    name: "Addy",
    effect: EffectType.ThoughtProvoking,
    effectTransformers: {
      [EffectType.Explosive]: EffectType.Euphoric,
      [EffectType.Foggy]: EffectType.Energizing,
      [EffectType.Glowing]: EffectType.Refreshing,
      [EffectType.LongFaced]: EffectType.Electrifying,
      [EffectType.Sedating]: EffectType.Gingeritis,
    },
    price: 9,
    level: LevelType.HustlerII
  },
  [IngredientType.Battery]: {
    name: "Battery",
    effect: EffectType.BrightEyed,
    effectTransformers: {
      [EffectType.Cyclopean]: EffectType.Glowing,
      [EffectType.Electrifying]: EffectType.Euphoric,
      [EffectType.Euphoric]: EffectType.Zombifying,
      [EffectType.Laxative]: EffectType.CalorieDense,
      [EffectType.Munchies]: EffectType.TropicThunder,
      [EffectType.Shrinking]: EffectType.Munchies,
    },
    price: 8,
    level: LevelType.PeddlerV
  }
}
export function getIngredients(): IngredientWithId[] {
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
