import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },  {
    path: 'create-recipe',
    loadComponent: () => import('./pages/my-recipes/create-recipe/create-recipe.page').then( m => m.CreateRecipePage)
  },

];
