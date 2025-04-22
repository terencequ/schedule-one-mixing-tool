import { Routes } from '@angular/router';
import {IngredientsPageComponent} from './pages/ingredients-page/ingredients-page.component';
import {EffectsPageComponent} from './pages/effects-page/effects-page.component';

export const routes: Routes = [
  {
    path: "ingredients",
    title: "Schedule 1 - Mixing Tool | Ingredients",
    component: IngredientsPageComponent
  },
  {
    path: "effects",
    title: "Schedule 1 - Mixing Tool | Effects",
    component: EffectsPageComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "ingredients"
  }
];
