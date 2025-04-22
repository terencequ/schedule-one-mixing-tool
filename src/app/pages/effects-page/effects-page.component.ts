import { Component } from '@angular/core';
import {EffectChipComponent} from '../../components/effect-chip/effect-chip.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {Effects, EffectsDictionary} from '../../data/effects';
import {Effect} from '../../models/effect';
import {EffectType} from '../../models/effect-type';
import {IngredientType} from '../../models/ingredient-type';
import {Ingredient} from '../../models/ingredient';
import {Ingredients} from '../../data/ingredients';
import {EffectDifferenceComponent} from '../../components/effect-difference/effect-difference.component';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {EffectNodeComponent} from '../../components/effect-node/effect-node.component';

@Component({
  selector: 'app-effects-page',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatCard,
    MatCardContent,
    MatCardHeader,
    NgIf,
    EffectNodeComponent
  ],
  templateUrl: './effects-page.component.html',
  styleUrl: './effects-page.component.scss'
})
export class EffectsPageComponent {
  protected readonly columnsToDisplay: string[] = ['name', 'multiplier'];
  protected readonly effects: (Effect & {id: EffectType})[] = Effects;

  protected selectedEffect?: Effect & {id: EffectType};
  protected selectedEffectIngredientTransformers: { source: IngredientType, sourceIngredient: Ingredient, from: EffectType, fromEffect: Effect, to: EffectType, toEffect: Effect, multiplierDifference: number }[] = [];

  onRowClicked(row: Effect & {id: EffectType}) {
    this.selectedEffect = row;
    this.selectedEffectIngredientTransformers = Ingredients.flatMap(i => {
      const relevantEffectTransformers = i.effectTransformers.filter(t => t.to === row.id);
      return relevantEffectTransformers.map(t => ({
        source: i.id,
        sourceIngredient: i,
        from: t.from,
        fromEffect: EffectsDictionary[t.from],
        to: t.to,
        toEffect: EffectsDictionary[t.to],
        multiplierDifference: Number((EffectsDictionary[t.to].multiplier - EffectsDictionary[t.from].multiplier).toFixed(2))
      }))
    }).sort((a, b) => b.multiplierDifference - a.multiplierDifference)
  }
}
