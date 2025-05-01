import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import {AboutUsComponent} from '@pages/about.us/about.us.component';
import {RecipesComponent} from '@pages/recipes/recipes.component';
import {MyRecipesComponent} from '@pages/my/recipes/my.recipes.component';
import {RecipeComponent} from '@pages/recipes/recipe/recipe.component';
import {SignUpComponent} from '@pages/sign-up/sign-up.component';
import {SignInComponent} from '@pages/sign-in/sign-in.component';
import {ProfileComponent} from '@pages/my/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/page', component: RecipeComponent },
  { path: 'my/recipes', component: MyRecipesComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'my/profile', component: ProfileComponent },
];
