import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForecastComponent } from './forecast/forecast.component';
import { OptimizationComponent } from './optimization/optimization.component';
import { HomeComponent } from './home/home.component';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PopulateComponent } from './forecast/populate/populate.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoalGeneratorsComponent } from './optimization/coal-generators/coal-generators.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { GasGeneratorsComponent } from './optimization/gas-generators/gas-generators.component';
import { SolarGeneratorsComponent } from './optimization/solar-generators/solar-generators.component';
import { TrainComponent } from './forecast/train/train.component';
import { WindGeneratorsComponent } from './optimization/wind-generators/wind-generators.component';
import { HydroGeneratorsComponent } from './optimization/hydro-generators/hydro-generators.component';
import { DatePipe } from '@angular/common';

import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { RoundNumberPipe } from './round-number.pipe';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    ForecastComponent,
    OptimizationComponent,
    HomeComponent,
    PopulateComponent,
    CoalGeneratorsComponent,
    GasGeneratorsComponent,
    SolarGeneratorsComponent,
    TrainComponent,
    WindGeneratorsComponent,
    HydroGeneratorsComponent,
    CanvasJSChart,
    RoundNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    NgxSliderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
