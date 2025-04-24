import {Component, inject, OnInit} from '@angular/core';
import {Products, ProductsDictionary} from '../../data/products';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {Product} from '../../models/product';
import {IngredientWithId} from '../../models/ingredient';
import {EffectWithId} from '../../models/effect';
import {Ingredients} from '../../data/ingredients';
import {ProductType} from '../../models/product-type';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatList, MatListItem} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Mix} from '../../models/mix';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ConfirmDialogComponent, ConfirmDialogData} from '../../components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {calculateEffectsAndPrice} from '../../helpers/mix-helper';
import {MixResult} from '../../models/mix-result';
import {MixResultComponent} from '../../components/mix-result/mix-result.component';

const MIX_LOCAL_STORAGE_KEY = "mixes";

@Component({
  imports: [
    NgForOf,
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
    MixResultComponent,
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
  selectedIngredients: IngredientWithId[] = [];
  ingredientOptions: {
    ingredient: IngredientWithId,
    effects: EffectWithId[],
    multiplierDifference: number
  } [] = []

  // Calculated mix result
  currentMixResult?: MixResult;

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
  onIngredientAdd(ingredient: IngredientWithId) {
    this.selectedIngredients.push(ingredient);
    this.refresh();
  }

  /**
   * Move an existing ingredient up in the list.
   * @param ingredient
   * @param i
   */
  onIngredientMoveUp(ingredient: IngredientWithId, i: number) {
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
  onIngredientMoveDown(ingredient: IngredientWithId, i: number) {
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
  onIngredientDelete(ingredient: IngredientWithId, i: number) {
    this.selectedIngredients.splice(i, 1);
    this.refresh();
  }

  /**
   * Recalculate the current effects of the entire mix.
   */
  refresh() {
    // Update the effects and pricing
    const res = calculateEffectsAndPrice(this.selectedProduct, this.selectedIngredients);
    this.currentMixResult = res;

    // Update the ingredient selection list details
    this.ingredientOptions = this.ingredients.map(i => {
      const optionRes = calculateEffectsAndPrice(this.selectedProduct, [...this.selectedIngredients, i])
      return {
        ingredient: i,
        effects: optionRes.effects,
        multiplierDifference: Number((optionRes.totalMultiplier - res.totalMultiplier).toFixed(2)),
      }
    })

    // Filter options where the effect list is different
    this.ingredientOptions = this.ingredientOptions.filter(o => {
      if (o.effects.length !== res.effects.length) {
        return true;
      }
      for (let i = 0; i < o.effects.length; i++) {
        if (o.effects[i].id !== res.effects[i].id) {
          return true;
        }
      }
      return false;
    })

    // Order options by most immediate multiplier increase
    this.ingredientOptions = this.ingredientOptions.sort((a, b) => b.multiplierDifference - a.multiplierDifference);
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
    this.dialog.open(ConfirmDialogComponent, {
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
