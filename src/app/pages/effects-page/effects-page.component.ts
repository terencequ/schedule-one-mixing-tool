import {Component, HostListener} from '@angular/core';
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
import {Effect, EffectWithId} from '../../models/effect';
import {EffectType} from '../../models/effect-type';
import {IngredientType} from '../../models/ingredient-type';
import {Ingredient} from '../../models/ingredient';
import {Ingredients} from '../../data/ingredients';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {EffectNodeComponent} from '../../components/effect-node/effect-node.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

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
    EffectNodeComponent,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './effects-page.component.html',
  styleUrl: './effects-page.component.scss'
})
export class EffectsPageComponent {
  protected readonly columnsToDisplay: string[] = ['name', 'multiplier'];
  protected readonly effects: EffectWithId[] = Effects;

  protected selectedEffect?: EffectWithId;
  protected selectedEffectIngredientTransformers: { source: IngredientType, sourceIngredient: Ingredient, from: EffectType, fromEffect: Effect, to: EffectType, toEffect: Effect, multiplierDifference: number }[] = [];

  protected shouldHideListWhenSelected: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.onResize();
    this.route.queryParams.subscribe(params => {
      if(params['id']){
        const id = Number(params['id']) as EffectType;
        this.refresh(id);
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.shouldHideListWhenSelected = window.innerWidth <= 1500;
  }

  async onRowClicked(row: EffectWithId) {
    await this.router.navigate([], {queryParams: {id: row.id}});
    this.refresh(row.id);
  }

  async onClearSelection() {
    await this.router.navigate([], {queryParams: {}});
    this.selectedEffect = undefined;
    this.selectedEffectIngredientTransformers = [];
  }

  refresh(id: EffectType) {
    this.selectedEffect = {id: id, ...EffectsDictionary[id]};
    this.selectedEffectIngredientTransformers = Ingredients.flatMap(i => {
      const relevantEffectTransformers = i.effectTransformers.filter(t => t.to === this.selectedEffect?.id);
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
