// src/app/guards/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data?.['role'];

  const user = auth.getUser(); // depuis le localStorage (cf. méthode ci-dessous)

  if (user && user.role === expectedRole) {
    return true;
  }

  router.navigate(['/not-found']);
  return false;
};
