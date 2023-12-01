import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main/main.component';
import { OrderDetailsComponent } from './pages/order/components/order-details/order-details.component';
import { AuthGuard } from './services-shared/auth-guard';
import { AuthLoadGuard } from './services-shared/auth-load-guard';

const routes: Routes = [
  {path: "shop", canLoad: [AuthLoadGuard], component: MainComponent, loadChildren: () => import('./pages/main/main.module').then(module => module.MainModule)},
  {path: "auth", loadChildren: () => import('./pages/authentication/authentication.module').then(module => module.AuthenticationModule)},
  {path: "order", canLoad: [AuthLoadGuard], component: OrderDetailsComponent, loadChildren: () => import('./pages/order/order.module').then(module => module.OrderModule)},
  {path: "", redirectTo: "auth", pathMatch: 'full' },
  {path: "**", redirectTo: "auth", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
