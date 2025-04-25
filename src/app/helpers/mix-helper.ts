import {ProductWithId} from '../models/product';
import {IngredientWithId} from '../models/ingredient';
import {EffectsDictionary} from '../data/effects';
import {EffectWithId} from '../models/effect';
import {MixResult} from '../models/mix-result';
import {EffectType} from '../models/effect-type';
import {getEffectTransformerDictionaryAsArray} from './effect-transformer-helper';

/**
 * Calculate an effects list based on a starting product and a list of ingredients.
 * @param product
 * @param ingredients
 * @private
 */
export function calculateEffectsAndPrice(product: ProductWithId, ingredients: IngredientWithId[]): MixResult {
  let effects = product.startingEffects.map(e => ({...EffectsDictionary[e], id: e}));
  for (let ingredient of ingredients) {
    const transformations: {index: number, newEffectType: EffectType}[] = [];

    // Run transformers
    const effectTransformers = getEffectTransformerDictionaryAsArray(ingredient.effectTransformers);
    for(const transformer of effectTransformers){
      const effectIndex = effects.findIndex(e => e.id === transformer.from);
      const existingToEffectIndex = effects.findIndex(e => e.id === transformer.to);
      const effectAlreadyExists = existingToEffectIndex !== -1 && !transformations.find(t => t.index === existingToEffectIndex);
      if(effectIndex !== -1 && !effectAlreadyExists) {
        transformations.push({index: effectIndex, newEffectType: transformer.to});
      }
    }
    for(let transformation of transformations){
      effects[transformation.index] = {id: transformation.newEffectType, ...EffectsDictionary[transformation.newEffectType]};
    }

    // Attempt to add the ingredient's main effect
    if (effects.length < 8 && !effects.some(e => e.id === ingredient.effect)) {
      effects.push({id: ingredient.effect, ...EffectsDictionary[ingredient.effect]});
    }
  }

  // Update the pricing
  let startingPrice = product.basePrice;
  let totalMultiplier = Number((effects.reduce((sum, effect) => sum + effect.multiplier, 1)).toFixed(2));
  let totalPrice = Number((totalMultiplier * startingPrice).toFixed(0));

  let totalCost = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0)

  return {
    product: product,
    ingredients: ingredients,
    effects: effects,
    totalMultiplier: totalMultiplier,
    totalRevenue: totalPrice,
    totalCost: totalCost,
    totalProfit: Number((totalPrice - totalCost).toFixed(0))
  }
}
