import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/welcome/welcome').then((m) => m.Welcome),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup').then((m) => m.Signup),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: '',
    loadComponent: () => import('./pages/shell/shell').then((m) => m.Shell),
    canActivate: [authGuard],
    children: [
      { path: 'home', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
      {
        path: 'category/:id',
        loadComponent: () => import('./pages/category-list/category-list').then((m) => m.CategoryList),
      },
      {
        path: 'recipe/:id',
        loadComponent: () => import('./pages/recipe-detail/recipe-detail').then((m) => m.RecipeDetail),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites/favorites').then((m) => m.Favorites),
      },
      {
        path: 'shopping-list',
        loadComponent: () => import('./pages/shopping-list/shopping-list').then((m) => m.ShoppingList),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
