import {Component, HostListener, OnInit} from '@angular/core';
import {Products, ProductsDictionary} from '../../data/products';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {Product} from '../../models/product';
import {Ingredient} from '../../models/ingredient';
import {Effect} from '../../models/effect';
import {EffectsDictionary} from '../../data/effects';
import {Ingredients} from '../../data/ingredients';
import {EffectChipComponent} from '../../components/effect-chip/effect-chip.component';
import {EffectType} from '../../models/effect-type';
import {IngredientType} from '../../models/ingredient-type';
import {ProductType} from '../../models/product-type';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatList, MatListItem} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';

@Component({
  imports: [
    NgForOf,
    EffectChipComponent,
    NgIf,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatListItem,
    MatList,
    MatIconButton,
    MatIcon,
    NgStyle,
  ],
  selector: 'app-mixer-page',
  styleUrl: './mixer-page.component.scss',
  templateUrl: './mixer-page.component.html'
})
export class MixerPageComponent implements OnInit {
  // Products
  products = Products;
  selectedProduct: Product & { id: ProductType } = Products[0];

  // Ingredients
  ingredients = Ingredients;
  selectedIngredients: (Ingredient & { id: IngredientType })[] = [];
  ingredientOptions: {
    ingredient: (Ingredient & { id: IngredientType }),
    effects: (Effect & { id: EffectType })[],
    multiplierDifference: number
  } [] = []

  // Effects
  currentEffects: (Effect & { id: EffectType })[] = [];

  // Pricing
  currentTotalCost: number = 0;
  currentStartingPrice: number = 0;
  currentTotalMultiplier: number = 1;
  currentTotalPrice: number = 0;

  ngOnInit() {
    this.refresh();
  }

  /**
   * Select the base product for mixing.
   * @param product
   */
  onSelectProduct(product?: ProductType) {
    if (product === undefined || product === null) {
      return;
    }
    this.selectedProduct = {id: product, ...ProductsDictionary[product]};
    this.refresh();
  }

  /**
   * Add a new ingredient to the bottom of the list.
   * @param ingredient
   */
  onIngredientAdd(ingredient: (Ingredient & { id: IngredientType })) {
    this.selectedIngredients.push(ingredient);
    this.refresh();
  }

  /**
   * Move an existing ingredient up in the list.
   * @param ingredient
   * @param i
   */
  onIngredientMoveUp(ingredient: Ingredient & { id: IngredientType }, i: number) {
    const temp = this.selectedIngredients[i];
    this.selectedIngredients[i] = this.selectedIngredients[i - 1];
    this.selectedIngredients[i - 1] = temp;
    this.refresh();
  }

  /**
   * Move an existing ingredient down in the list.
   * @param ingredient
   * @param i
   */
  onIngredientMoveDown(ingredient: Ingredient & { id: IngredientType }, i: number) {
    const temp = this.selectedIngredients[i];
    this.selectedIngredients[i] = this.selectedIngredients[i + 1];
    this.selectedIngredients[i + 1] = temp;
    this.refresh();
  }

  /**
   * Delete an existing ingredient.
   * @param ingredient
   * @param i
   */
  onIngredientDelete(ingredient: Ingredient & { id: IngredientType }, i: number) {
    this.selectedIngredients.splice(i, 1);
    this.refresh();
  }

  /**
   * Recalculate the current effects of the entire mix.
   */
  refresh() {
    // Update the effects and pricing
    const res = this.calculateEffectsAndPrice(this.selectedProduct, this.selectedIngredients);
    this.currentEffects = res.effects
    this.currentStartingPrice = res.startingPrice;
    this.currentTotalMultiplier = res.totalMultiplier;
    this.currentTotalPrice = res.totalPrice;
    this.currentTotalCost = res.totalCost;

    // Update the ingredient selection list details
    this.ingredientOptions = this.ingredients.map(i => {
      const optionRes = this.calculateEffectsAndPrice(this.selectedProduct, [...this.selectedIngredients, i])
      return {
        ingredient: i,
        effects: optionRes.effects,
        multiplierDifference: Number((optionRes.totalMultiplier - this.currentTotalMultiplier).toFixed(2)),
      }
    })

    // Filter options where the effect list is different
    this.ingredientOptions = this.ingredientOptions.filter(o => {
      if (o.effects.length !== this.currentEffects.length) {
        return true;
      }
      for (let i = 0; i < o.effects.length; i++) {
        if (o.effects[i].id !== this.currentEffects[i].id) {
          return true;
        }
      }
      return false;
    })

    // Order options by most immediate multiplier increase
    this.ingredientOptions = this.ingredientOptions.sort((a, b) => b.multiplierDifference - a.multiplierDifference);
  }

  /**
   * Calculate an effects list based on a starting product and a list of ingredients.
   * @param product
   * @param ingredients
   * @private
   */
  private calculateEffectsAndPrice(product: Product & { id: ProductType }, ingredients: (Ingredient & {
    id: IngredientType
  })[]) {
    let effects = product.startingEffects.map(e => ({...EffectsDictionary[e], id: e}));
    for (let ingredient of ingredients) {
      let newEffectList: ({id: EffectType} & Effect)[] = [];
      for(const effect of effects){
        // If an effect needs to be transformed, transform and add to the new list
        const effectTransformer = ingredient.effectTransformers.find(et => et.from === effect.id);
        if(effectTransformer && !effects.some(e => e.id === effectTransformer.to)){
          newEffectList.push({id: effectTransformer.to, ...EffectsDictionary[effectTransformer.to]});
        } else {
          newEffectList.push(effect);
        }
      }
      effects = newEffectList;

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
      effects: effects,
      startingPrice: startingPrice,
      totalMultiplier: totalMultiplier,
      totalPrice: totalPrice,
      totalCost: totalCost
    }
  }

}
