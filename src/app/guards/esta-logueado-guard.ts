import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SupabaseService } from '../services/supabase.service';

export const estaLogueadoGuard: CanActivateFn = async (route, state) => {
  
  const authS = inject(AuthService);
  const supabaseS = inject(SupabaseService);
  const router = inject(Router);

  const { data } =
      await supabaseS.supabase.auth.getUser();

    if (data.user) {

      authS.usuarioActual.set(data.user);

      return true;
    }
    else {

      return router.createUrlTree(['/auth/login']);
    }
};
