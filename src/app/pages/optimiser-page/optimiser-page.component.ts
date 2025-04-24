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

@Component({
  selector: 'optimiser-page',
  imports: [
    MatButton,
    NgForOf,
    MixResultComponent,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './optimiser-page.component.html',
  styleUrl: './optimiser-page.component.scss'
})
export class OptimiserPageComponent {

  products = Products;

  ingredientTypes: IngredientType[] = Ingredients.map(i => i.id);

  form = new FormGroup({
    productType: new FormControl<ProductType>(ProductType.OGKush, {nonNullable: true, validators: [Validators.required]}),
    maxIngredientCount: new FormControl<number>(4, {nonNullable: true, validators: [Validators.required, Validators.min(1)]}),
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

  constructor() {
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

    // Start the queue
    const queue: IngredientType[][] = [];
    for(let ingredient of this.ingredientTypes){
      queue.push([ingredient])
    }

    while(queue.length > 0){
      const current = queue.pop();
      if(current){
        this.processIngredientList(current, queue);
      }
    }
  }

  processIngredientList(ingredientTypes: IngredientType[], queue: IngredientType[][]) {
    // Calculate mix
    const productType = this.form.controls.productType.value;
    const product = {id: productType, ...ProductsDictionary[productType]};
    const ingredients = ingredientTypes.map(ingredientType => ({id: ingredientType, ...IngredientsDictionary[ingredientType]}));
    const res = calculateEffectsAndPrice(product, ingredients);

    // Update best-in-category for all categories
    if(!this.mostProfitMix || res.totalProfit > this.mostProfitMix.totalProfit){
      this.mostProfitMix = res;
    }
    if(!this.mostRevenueMix || res.totalRevenue > this.mostRevenueMix.totalRevenue){
      this.mostRevenueMix = res;
    }
    if(!this.leastCostMix || res.totalCost < this.leastCostMix.totalCost){
      this.leastCostMix = res;
    }
    if(!this.leastIngredientsMix || res.ingredients.length < this.leastIngredientsMix.ingredients.length){
      this.leastIngredientsMix = res;
    }

    // Append all branches to the queue (if the max ingredient count hasn't been reached)
    if (ingredientTypes.length < this.form.controls.maxIngredientCount.value) {
      for (let ingredient of this.ingredientTypes) {
        queue.push([...ingredientTypes, ingredient]);
      }
    }
  }
}
