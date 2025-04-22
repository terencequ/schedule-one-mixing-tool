import {Product} from '../models/product';
import {EffectType} from '../models/effect-type';
import {ProductType} from '../models/product-type';

export const ProductsDictionary: { [key in ProductType]: Product } = {
  [ProductType.OGKush]: {
    name: "OG Kush",
    startingEffects: [EffectType.Calming],
    basePrice: 35,
  },
  [ProductType.SourDiesel]: {
    name: "Sour Diesel",
    startingEffects: [EffectType.Refreshing],
    basePrice: 35,
  },
  [ProductType.GreenCrack]: {
    name: "Green Crack",
    startingEffects: [EffectType.Energizing],
    basePrice: 35,
  },
  [ProductType.GranddaddyPurple]: {
    name: "Granddaddy Purple",
    startingEffects: [EffectType.Sedating],
    basePrice: 35,
  },
  [ProductType.Meth]: {
    name: "Meth",
    startingEffects: [],
    basePrice: 70,
  },
  [ProductType.Cocaine]: {
    name: "Cocaine",
    startingEffects: [],
    basePrice: 150,
  },
}

export function getProducts() {
  const productTypes = Object.keys(ProductsDictionary);
  return productTypes.map(typeStr => {
    const type = Number(typeStr) as ProductType;
    const product = ProductsDictionary[type];
    return {
      id: type,
      ...product
    }
  })
}
export const Products = getProducts();
