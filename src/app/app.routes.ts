import { Routes } from '@angular/router';
import {IngredientsPageComponent} from './pages/ingredients-page/ingredients-page.component';
import {EffectsPageComponent} from './pages/effects-page/effects-page.component';
import {MixerPageComponent} from './pages/mixer-page/mixer-page.component';
import {OptimiserPageComponent} from './pages/optimiser-page/optimiser-page.component';

export const routes: Routes = [
  {
    path: "optimiser",
    title: "Schedule 1 - Mixing Tool | Optimiser",
    component: OptimiserPageComponent
  },
  {
    path: "mixer",
    title: "Schedule 1 - Mixing Tool | Mixer",
    component: MixerPageComponent
  },
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
    redirectTo: "optimiser"
  }
];
