import {Product} from './product';
import {ProductType} from './product-type';
import {Ingredient} from './ingredient';
import {IngredientType} from './ingredient-type';

/**
 * Represents a mix recipe.
 */
export interface Mix {
  name: string;
  product: Product & { id: ProductType };
  ingredients: (Ingredient & { id: IngredientType })[];
}
