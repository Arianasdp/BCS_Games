import { Routes } from '@angular/router';
import { estaLogueadoGuard } from './guards/esta-logueado-guard';
import { authVerificationGuard } from './guards/auth-verification-guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: 'full'
    },
    {
        path: "home",
        loadComponent: () => import('./pages/home/home').then((m) => m.Home)
    },
    {
        path: "sobre-mi",
        loadComponent: () => import('./pages/sobre-mi/sobre-mi').then((m) => m.SobreMi)
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.routes').then(m => m.authRoutes),
        canActivate: [authVerificationGuard]
    },
    {
        path: 'games',
        loadChildren: () =>
            import('./games/game.routes').then(m => m.gameRoutes),
        canActivate: [estaLogueadoGuard]
    },
    {
        path: "**",
        loadComponent: () => import('./pages/error-page/error-page').then((m) => m.ErrorPage)//siempre va al final, es el último caso a evaluar, si no entra a las anteriores, entra a este. Pero si se declara antes, va a frenar ahí, tipo: home, **, login y le ponés login y no lo reconoce porque frenó en el comodín (**)
    }
];
