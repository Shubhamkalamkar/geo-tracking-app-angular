import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',  // Default redirection to 'login' page
  },
  {
    path: '',
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
        path: 'verifyOTP',
        loadComponent: () =>
          import('./auth/components/enterotp/enterotp.component').then(
            (c) => c.EnterotpComponent
          ),
      },
    ],
  },
  {
    path:'usertype',
    loadComponent:()=> import('./pages/usertype/usertype.component').then((c)=>c.UsertypeComponent)
  },
  {
    path:'enterShopDetails',
    loadComponent:()=> import('./pages/enter-shop-details/enter-shop-details.component').then((c)=>c.EnterShopDetailsComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'memberlist',
        loadComponent: () =>
          import('./pages/memberlist/memberlist.component').then(
            (c) => c.MemberlistComponent
          ),
      },
      {
        path: 'menu',
        loadComponent: () =>
          import('./pages/menu/menu.component').then(
            (c) => c.MenuComponent
          ),
      },
      {
        path: 'addnewmember',
        loadComponent: () =>
          import('./pages/addnewmember/addnewmember.component').then(
            (c) => c.AddnewmemberComponent
          ),
      },
    ],
  },
];
