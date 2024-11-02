import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const exp: string | null = localStorage.getItem('exp');
  const date =  Math.floor(new Date().getTime() / 1000).toString();
  if (!exp) {
    return true;
  }

  if (exp && exp < date) {
    Swal.fire({
      html: `
      <h1 style="font-size: 2rem; font-family: 'Roboto', sans-serif;">Su token ha expirado</h1>
      `,
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      router.navigate(['login']);
    });

    localStorage.removeItem('exp');
    return false;
  }

  const url = router.parseUrl('dashboard');
  return new RedirectCommand(url);
}