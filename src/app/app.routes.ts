import { Routes } from '@angular/router';

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
            import('./auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: 'games',
        loadChildren: () =>
            import('./games/game.routes').then(m => m.gameRoutes)
    }
];
