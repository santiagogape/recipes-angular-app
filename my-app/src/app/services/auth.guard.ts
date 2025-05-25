import { inject } from '@angular/core';
import {CanActivateFn} from '@angular/router';
import {AuthService} from '@services/firebase/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isLoggedIn$
  //.pipe(map(isLoggedIn => isLoggedIn ? true: router.createUrlTree(['/login'])));
};
