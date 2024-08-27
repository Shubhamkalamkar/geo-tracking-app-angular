import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((c) => c.AuthComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/components/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./auth/components/sign-up/sign-up.component').then(
            (c) => c.SignUpComponent
          ),
      },
      {
        path: 'reset-password/:token',
        loadComponent: () =>
          import(
            './auth/components/reset-password/reset-password.component'
          ).then((c) => c.ResetPasswordComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import(
            './auth/components/forgot-password/forgot-password.component'
          ).then((c) => c.ForgotPasswordComponent),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
];
