import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authGuard} from "@services/auth.guard";

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('@pages/sign-in/sign-in.page').then((m) => m.SignInPage),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('@pages/register/register.page').then((m) => m.RegisterPage),
      },
      {
        path: 'my-recipes',
        canActivate: [authGuard],
        loadComponent: () =>
          import('@pages/my-recipes/my-recipes.page').then((m) => m.MyRecipesPage),
      },
      {
        path: 'favourites',
        canActivate: [authGuard],
        loadComponent: () =>
          import('@pages/my-recipes/favourites/favourites.page').then((m) => m.FavouritesPage),
      },
      {
        path: '',
        redirectTo: '/tabs/register',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/register',
    pathMatch: 'full',
  },
];
