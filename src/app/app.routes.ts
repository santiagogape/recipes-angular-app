import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {AboutUsComponent} from './pages/about.us/about.us.component';
import {RecipesComponent} from './pages/recipes/recipes.component';
import {MyRecipesComponent} from './pages/my/recipes/my.recipes.component';
import {RecipeComponent} from './pages/recipes/recipe/recipe.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'my/recipes', component: MyRecipesComponent },
  { path: 'recipe', component: RecipeComponent }
];
