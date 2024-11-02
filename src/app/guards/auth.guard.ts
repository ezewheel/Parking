import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const exp: string | null = localStorage.getItem('exp');
  const date = Math.floor(new Date().getTime() / 1000).toString();
  if (exp && exp > date) {
    return true;
  }
  const url = router.parseUrl('login');
  return new RedirectCommand(url);;
};