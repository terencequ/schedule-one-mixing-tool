import {Component, inject, OnInit} from '@angular/core';
import {Products, ProductsDictionary} from '../../data/products';
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
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatList, MatListItem} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Mix} from '../../models/mix';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatChipEditedEvent, MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {ConfirmDialogComponent, ConfirmDialogData} from '../../components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

const MIX_LOCAL_STORAGE_KEY = "mixes";

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
    MatInput,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatCardHeader
  ],
  selector: 'app-mixer-page',
  styleUrl: './mixer-page.component.scss',
  templateUrl: './mixer-page.component.html'
})
export class MixerPageComponent implements OnInit {
  // DI
  readonly dialog = inject(MatDialog);

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

  // Mixes loaded from local storage
  mixes: Mix[] = [];
  currentMixNameControl = new FormControl<string>("", {nonNullable: true, validators: [Validators.required]});


  constructor() {
    this.loadMixes();
  }

  ngOnInit() {
    this.refresh();
  }

  /**
   * Load mixes from local storage.
   */
  loadMixes() {
    const mixesJson = localStorage.getItem(MIX_LOCAL_STORAGE_KEY);
    if(mixesJson) {
      this.mixes = JSON.parse(mixesJson);
    }
  }

  /**
   * Save mixes into local storage.
   */
  saveMixes() {
    // Sort mixes alphabetically
    this.mixes = this.mixes.sort((a, b) => a.name.localeCompare(b.name));

    // Save
    localStorage.setItem(MIX_LOCAL_STORAGE_KEY, JSON.stringify(this.mixes));
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

  onSaveMix() {
    const existingMix = this.mixes.find(m => m.name === this.currentMixNameControl.value);
    if (existingMix) {
      existingMix.product = this.selectedProduct;
      existingMix.ingredients = [...this.selectedIngredients];
    } else {
      this.mixes.push({
        name: this.currentMixNameControl.value,
        product: this.selectedProduct,
        ingredients: [...this.selectedIngredients],
      })
    }

    // Save
    this.saveMixes();
  }

  /**
   * Load a mix.
   * @param mix
   */
  onLoadMix(mix: Mix) {
    this.selectedProduct = mix.product;
    this.selectedIngredients = [...mix.ingredients];
    this.currentMixNameControl.setValue(mix.name);
    this.refresh();
  }

  /**
   * Remove a mix.
   * @param mix
   */
  onRemoveMix(mix: Mix) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Delete "+mix.name,
        body: `Are you sure you want to delete ${mix.name}?`,
        confirmLabel: "Delete",
        cancelLabel: "Cancel",
        onConfirm: () => {
          this.mixes.splice(this.mixes.indexOf(mix), 1);
          this.saveMixes();
        }
      } as ConfirmDialogData
    });
  }


}
