import { Routes } from '@angular/router';
import { LayoutAdmin } from './components/layout-admin/layout-admin';
import { LayoutTienda } from './components/layout-tienda/layout-tienda';

export const routes: Routes = [
  {
    path: '',
    component: LayoutTienda,
    children: [
      { path: '', redirectTo: 'tienda/inicio', pathMatch: 'full' },
      { path: 'tienda', redirectTo: 'tienda/inicio', pathMatch: 'full' },
      {
        path: 'tienda/inicio',
        loadComponent: () => import('./pages/tienda/inicio/inicio').then((m) => m.Inicio),
      },
      {
        path: 'tienda/carrito',
        loadComponent: () => import('./pages/tienda/carrito/carrito').then((m) => m.Carrito),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'admin',
    component: LayoutAdmin,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
      },
    ],
  },
  { path: '**', redirectTo: 'tienda/inicio' },
];
