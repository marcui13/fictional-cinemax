import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./@components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'movie-list',
    loadComponent: () =>
      import('./@components/movie/movie-list/movie-list.component').then(
        (m) => m.MovieListComponent
      ),
  },
  {
    path: 'movie-detail',
    loadComponent: () =>
      import('./@components/movie/movie-detail/movie-detail.component').then(
        (m) => m.MovieDetailComponent
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
