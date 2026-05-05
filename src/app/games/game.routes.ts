import { Routes } from '@angular/router';

export const gameRoutes: Routes = [
    {
        path: "",
        redirectTo: "hangman",
        pathMatch: "full"
    },
    {
        path: 'hangman',
        loadComponent: () =>
            import('./hangman/hangman').then((m) => m.Hangman)
    },
    {
        path: 'trivia',
        loadComponent: () =>
            import('./trivia/trivia').then((m) => m.Trivia)
    },
    {
        path: 'higher-lower',
        loadComponent: () =>
            import('./higher-lower/higher-lower').then((m) => m.HigherLower)
    }
]