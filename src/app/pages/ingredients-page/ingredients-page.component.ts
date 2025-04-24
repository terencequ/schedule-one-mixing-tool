import {Component, HostListener} from '@angular/core';
import {Ingredients, IngredientsDictionary} from '../../data/ingredients';
import {NgForOf, NgIf} from '@angular/common';
import {Ingredient, IngredientWithId} from '../../models/ingredient';
import {MatIconButton} from '@angular/material/button';
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
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {EffectDifferenceComponent} from '../../components/effect-difference/effect-difference.component';
import {Effect, EffectWithId} from '../../models/effect';
import {EffectType} from '../../models/effect-type';
import {EffectsDictionary} from '../../data/effects';
import {IngredientType} from '../../models/ingredient-type';
import {ActivatedRoute, Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';


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
    MatIconButton,
    MatIcon,
    MatCardTitle,
    MatCardSubtitle,
  ],
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.scss'
})
export class IngredientsPageComponent {
  protected readonly columnsToDisplay: string[] = ['name', 'price', 'effect'];
  protected readonly ingredients: Ingredient[] = Ingredients;

  protected selectedIngredient?: IngredientWithId;
  protected selectedIngredientTransformers: { from: EffectType, fromEffect: Effect, to: EffectType, toEffect: Effect, multiplierDifference: number }[] = [];

  protected shouldHideListWhenSelected: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.onResize();
    this.route.queryParams.subscribe(params => {
      if(params['id']){
        const id = Number(params['id']) as IngredientType;
        this.refresh(id);
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.shouldHideListWhenSelected = window.innerWidth <= 1500;
  }

  async onRowClicked(row: IngredientWithId) {
    await this.router.navigate([], {queryParams: {id: row.id}});
    this.refresh(row.id);
  }

  async onClearSelection() {
    await this.router.navigate([], {queryParams: {}});
    this.selectedIngredient = undefined;
    this.selectedIngredientTransformers = [];
  }

  refresh(id: IngredientType){
    this.selectedIngredient = {id: id, ...IngredientsDictionary[id]};
    this.selectedIngredientTransformers = this.selectedIngredient!.effectTransformers.map(t => ({
      from: t.from,
      to: t.to,
      fromEffect: EffectsDictionary[t.from],
      toEffect: EffectsDictionary[t.to],
      multiplierDifference: Number((EffectsDictionary[t.from].multiplier - EffectsDictionary[t.to].multiplier).toFixed(2)),
    }))
    this.selectedIngredientTransformers = this.selectedIngredientTransformers.sort((a, b) => a.multiplierDifference - b.multiplierDifference)
  }



}
