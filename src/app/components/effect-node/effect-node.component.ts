import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {EffectType} from '../../models/effect-type';
import {Effect} from '../../models/effect';
import {IngredientType} from '../../models/ingredient-type';
import {Ingredient} from '../../models/ingredient';
import {EffectsDictionary} from '../../data/effects';
import {Ingredients} from '../../data/ingredients';
import {EffectChipComponent} from '../effect-chip/effect-chip.component';
import {EffectDifferenceComponent} from '../effect-difference/effect-difference.component';
import {NgForOf, NgIf} from '@angular/common';
import {MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';

interface EffectIngredientTransformer {
  source: IngredientType,
  sourceIngredient: Ingredient,
  from: EffectType,
  fromEffect: Effect,
  to: EffectType,
  toEffect: Effect,
  multiplierDifference: number
}

@Component({
  selector: 'effect-node',
  imports: [
    EffectChipComponent,
    EffectDifferenceComponent,
    NgForOf,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    NgIf,
  ],
  templateUrl: './effect-node.component.html',
  styleUrl: './effect-node.component.scss'
})
export class EffectNodeComponent implements OnChanges {
  @Input({required: true})
  depth: number = 0;

  @Input({required: true})
  effectType!: EffectType;

  @Input({required: true})
  mode: "to" | "from" = "to";

  protected effect?: Effect;
  protected effectIngredientTransformers: EffectIngredientTransformer[] = [];

  isExpanded = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['effectType'] || changes['parentTransformers']) {
      // Load effect
      this.effect = EffectsDictionary[this.effectType];

      // Load effect transformers
      this.effectIngredientTransformers = Ingredients.flatMap(i => {
        const relevantEffectTransformers = i.effectTransformers
          .filter(t => t[this.mode] === this.effectType);
        return relevantEffectTransformers.map(t => ({
          source: i.id,
          sourceIngredient: i,
          from: t.from,
          fromEffect: EffectsDictionary[t.from],
          to: t.to,
          toEffect: EffectsDictionary[t.to],
          multiplierDifference: Number((EffectsDictionary[t.to].multiplier - EffectsDictionary[t.from].multiplier).toFixed(2))
        }))
      }).sort((a, b) => b.multiplierDifference - a.multiplierDifference);
    }
  }
}
