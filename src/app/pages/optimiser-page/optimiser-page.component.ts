import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductType} from '../../models/product-type';
import {Products, ProductsDictionary} from '../../data/products';
import {NgForOf} from '@angular/common';
import {IngredientType} from '../../models/ingredient-type';
import {Ingredients, IngredientsDictionary} from '../../data/ingredients';
import {calculateEffectsAndPrice} from '../../helpers/mix-helper';
import {MixResult} from '../../models/mix-result';
import {MixResultComponent} from '../../components/mix-result/mix-result.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {EffectType} from '../../models/effect-type';
import {Effects} from '../../data/effects';
import {EffectWithId} from '../../models/effect';
import {MatCheckbox} from '@angular/material/checkbox';
import {EffectChipComponent} from '../../components/effect-chip/effect-chip.component';

@Component({
  selector: 'optimiser-page',
  imports: [
    MatButton,
    NgForOf,
    MixResultComponent,
    MatTabGroup,
    MatTab,
    MatSlider,
    MatSliderThumb,
    MatCheckbox,
    EffectChipComponent
  ],
  templateUrl: './optimiser-page.component.html',
  styleUrl: './optimiser-page.component.scss'
})
export class OptimiserPageComponent {

  products = Products;
  effects = Effects;

  ingredientTypes: IngredientType[] = Ingredients.map(i => i.id);

  form = new FormGroup({
    productType: new FormControl<ProductType>(ProductType.OGKush, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    maxIngredientCount: new FormControl<number>(4, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)]
    }),
    effects: new FormControl<EffectType[]>([], {nonNullable: true}),
  })

  /**
   * The mix with the most revenue - cost.
   */
  mostProfitMix?: MixResult;

  /**
   * The mix with the most revenue.
   */
  mostRevenueMix?: MixResult;

  /**
   * The mix with the least cost.
   */
  leastCostMix?: MixResult;

  /**
   * The mix with the least amount of ingredients used.
   */
  leastIngredientsMix?: MixResult;

  queue: IngredientType[][] = [];
  processed: number = 0;
  isProcessing: boolean = false;

  startTime: number = 0;
  timeElapsed: number = 0;

  constructor() {
    const interval = setInterval(() => {
      if(this.isProcessing){
        return;
      }

      this.isProcessing = true;
      let numberProcessed = 0;
      while (numberProcessed <= 1000 && this.queue.length > 0) {
        const current = this.queue.pop();
        if (current) {
          this.processIngredientList(current);
          numberProcessed += 1;
          this.processed += 1;
          this.timeElapsed = Number(((new Date().getTime() - this.startTime)/1000).toFixed(0));
        }
      }
      this.isProcessing = false;
    }, 0.0001)
  }

  /**
   * Start the optimisation process.
   */
  onStart() {
    // Clear all best-in-category mixes
    this.mostProfitMix = undefined;
    this.mostRevenueMix = undefined;
    this.leastCostMix = undefined;
    this.leastIngredientsMix = undefined;

    // Populate the queue
    this.processed = 0;
    this.startTime = new Date().getTime();
    this.timeElapsed = 0;
    this.queue = [];
    for (let ingredient of this.ingredientTypes) {
      this.queue.push([ingredient])
    }

    this.startTime = new Date().getTime();
  }

  /**
   * Stop the optimisation process.
   */
  onStop() {
    this.queue = [];
  }

  processIngredientList(ingredientTypes: IngredientType[]) {
    // Calculate mix
    const productType = this.form.controls.productType.value;
    const product = {id: productType, ...ProductsDictionary[productType]};
    const ingredients = ingredientTypes.map(ingredientType => ({id: ingredientType, ...IngredientsDictionary[ingredientType]}));
    const res = calculateEffectsAndPrice(product, ingredients);

    // Only update best-in-category if the effects match.
    const effectsMatch = !this.form.controls.effects.value.some(type => !res.effects.some(e => e.id === type));
    if(effectsMatch){
      // Update best-in-category for all categories
      if (!this.mostProfitMix || res.totalProfit > this.mostProfitMix.totalProfit) {
        this.mostProfitMix = res;
      }
      if (!this.mostRevenueMix || res.totalRevenue > this.mostRevenueMix.totalRevenue) {
        this.mostRevenueMix = res;
      }
      if (!this.leastCostMix || res.totalCost < this.leastCostMix.totalCost) {
        this.leastCostMix = res;
      }
      if (!this.leastIngredientsMix || res.ingredients.length < this.leastIngredientsMix.ingredients.length) {
        this.leastIngredientsMix = res;
      }
    }

    // Append all branches to the queue (if the max ingredient count hasn't been reached)
    if (ingredientTypes.length < this.form.controls.maxIngredientCount.value) {
      for (let ingredient of this.ingredientTypes) {
        // If the ingredient is about to be added a third time in a row, don't add this to the queue.
        const isIngredientRepeated = ingredientTypes.length >= 2 && ingredientTypes[ingredientTypes.length - 1] === ingredient && ingredientTypes[ingredientTypes.length - 2] === ingredient;
        if(!isIngredientRepeated) {
          this.queue.push([...ingredientTypes, ingredient]);
        }
      }
    }
  }

  isEffectEnabled(effect: EffectWithId) {
    return this.form.controls.effects.value.some(e => e === effect.id);
  }

  setEffect(effect: EffectWithId, checked: boolean) {
    const isEffectEnabled = this.isEffectEnabled(effect);
    if(checked && !isEffectEnabled){
      this.form.controls.effects.value.push(effect.id);
    }
    if(!checked && isEffectEnabled){
      this.form.controls.effects.setValue(this.form.controls.effects.value.filter(e => e !== effect.id));
    }
  }
}
