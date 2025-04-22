import {Component, effect} from '@angular/core';
import {Ingredients} from '../../data/ingredients';
import {NgForOf, NgIf} from '@angular/common';
import {Ingredient} from '../../models/ingredient';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {EffectChipComponent} from '../../components/effect-chip/effect-chip.component';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {EffectDifferenceComponent} from '../../components/effect-difference/effect-difference.component';
import {Effect} from '../../models/effect';
import {EffectType} from '../../models/effect-type';
import {EffectsDictionary} from '../../data/effects';
import {IngredientType} from '../../models/ingredient-type';


@Component({
  selector: 'app-ingredients-page',
  imports: [
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    EffectChipComponent,
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    NgForOf,
    EffectDifferenceComponent,
  ],
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.scss'
})
export class IngredientsPageComponent {

  protected readonly columnsToDisplay: string[] = ['name', 'price', 'effect'];
  protected readonly ingredients: Ingredient[] = Ingredients;

  protected selectedIngredient?: Ingredient;
  protected selectedIngredientTransformers: { from: EffectType, fromEffect: Effect, to: EffectType, toEffect: Effect, multiplierDifference: number }[] = [];

  onRowClicked(row: Ingredient & {id: IngredientType}) {
    this.selectedIngredient = row;
    this.selectedIngredientTransformers = row.effectTransformers.map(t => ({
      from: t.from,
      to: t.to,
      fromEffect: EffectsDictionary[t.from],
      toEffect: EffectsDictionary[t.to],
      multiplierDifference: Number((EffectsDictionary[t.from].multiplier - EffectsDictionary[t.to].multiplier).toFixed(2)),
    }))
    this.selectedIngredientTransformers = this.selectedIngredientTransformers.sort((a, b) => a.multiplierDifference - b.multiplierDifference)
  }
}
