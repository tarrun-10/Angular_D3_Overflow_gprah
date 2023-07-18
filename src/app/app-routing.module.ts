import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { productComp } from './product/product';
import { ChartComponent } from './product/overflow/overflow';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const appRoutes: Routes = [
    { path: '', component: productComp },
    {path: "login", component: LoginComponent},
    {path:"register", component: RegisterComponent}
]

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
      )
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule {}