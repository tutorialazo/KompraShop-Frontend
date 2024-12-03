// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';

export const routes: Routes = [
  { 
    path: 'dashboard', 
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), 
    canActivate: [AuthGuard]
  },
  { 
    path: 'productos', 
    loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'categorias',
    loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'ordenes', 
    loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'perfil', 
    loadChildren: () => import('./modules/perfil/perfil.module').then(m => m.PerfilModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'usuarios', 
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule),
    canActivate: [RedirectGuard] 
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];
