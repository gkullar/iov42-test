import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home-container.component').then((m) => m.HomeContainerComponent)
  },
  {
    path: 'cinemas',
    loadComponent: () =>
      import('./cinemas/cinemas-container.component').then((m) => m.CinemasContainerComponent)
  },
  {
    path: 'cinemas/:id/screens',
    loadComponent: () =>
      import('./screens/screens-container.component').then((m) => m.ScreensContainerComponent)
  },
  {
    path: 'screenings',
    loadComponent: () =>
      import('./screenings/screenings-container.component').then(
        (m) => m.ScreeningsContainerComponent
      )
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
