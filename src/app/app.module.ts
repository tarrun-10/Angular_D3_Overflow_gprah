import { productComp } from './product/product';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { KpiComponent } from './kpi.comp/trial';
import { ChartComponent } from './product/overflow/overflow';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';


// const appRoutes: Routes = [
//   { path: '#!', component: productComp },
// ];

@NgModule({
  declarations: [
    AppComponent,
    productComp,
    KpiComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
    // RouterModule.forRoot(
    //   appRoutes,
    //   {
    //     enableTracing: true
    //   }
    // )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
