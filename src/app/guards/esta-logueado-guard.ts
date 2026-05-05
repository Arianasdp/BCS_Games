import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const estaLogueadoGuard: CanActivateFn = async (route, state) => {
  
  const authS = inject(AuthService);
  const router = inject(Router);

  const {data} = await authS.supabase.auth.getUser();
  if (data.user){
    return true;
  }
  else
  {
    return router.navigateByUrl("/auth/login");
  }
};
