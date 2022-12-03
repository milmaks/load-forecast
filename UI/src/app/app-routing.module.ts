import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastComponent } from './forecast/forecast.component';
import { HomeComponent } from './home/home.component';
import { OptimizationComponent } from './optimization/optimization.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'forecast', component:ForecastComponent},
  {path:'optimization', component:OptimizationComponent},
  {
    path:"**",
    redirectTo:''
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
