import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppState } from './app-state';

export const authGuard: CanActivateFn = () => {
  const state = inject(AppState);
  const router = inject(Router);
  if (state.isLoggedIn()) return true;
  return router.parseUrl('/');
};
