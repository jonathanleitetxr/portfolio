import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return true; // pas connecté, on peut accéder à /login
  }

  // Déjà connecté : on redirige vers l'accueil
  router.navigate(['/']);
  return false;
};