import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IgxCategoryXAxisComponent, IgxDataChartComponent, IgxLegendComponent, IgxNumericYAxisComponent, IgxStackedAreaSeriesComponent, IgxStackedFragmentSeriesComponent } from 'igniteui-angular-charts';
import { ToastrService } from 'ngx-toastr';
import { CoalPowerPlant, GasPowerPlant, HydroPowerPlant, OptimizationParameters, SolarPowerPlant, WindPowerPlant } from '../types';
import { OptimizationService } from './optimization.service';

@Component({
  selector: 'app-optimization',
  templateUrl: './optimization.component.html',
  styleUrls: ['./optimization.component.css']
})
export class OptimizationComponent implements OnInit {
  
  coalPowerPlant1: CoalPowerPlant = {
    id: 0,
    name: "C1",
    power: 2500,
    co2: 820,
    fuelPrice: 258.00,
    priceToPowerCurve: [
      [0.2, 1],
      [0.4, 0.65],
      [0.6, 0.4],
      [0.8, 0.25],
      [1, 0.2],
    ],
    priceToCo2Curve: [
      [0.2, 1],
      [0.4, 0.95],
      [0.6, 0.8],
      [0.8, 0.6],
      [1, 0.2],
    ],
    Co2ToPowerCurve: [
      [0.2, 0.2],
      [0.4, 0.25],
      [0.6, 0.4],
      [0.8, 0.65],
      [1, 1],
    ],
    Co2ToPowerCurveQuadratic: true,
    priceToCo2CurveQuadratic: true,
    priceToPowerCurveQuadratic: true
  }

  coalPowerPlant2: CoalPowerPlant = {
    id: 0,
    name: "C2",
    power: 1500,
    co2: 820,
    fuelPrice: 258.00,
    priceToPowerCurve: [
      [0.2, 1],
      [0.4, 0.65],
      [0.6, 0.4],
      [0.8, 0.25],
      [1, 0.2],
    ],
    priceToCo2Curve: [
      [0.2, 1],
      [0.4, 0.95],
      [0.6, 0.8],
      [0.8, 0.6],
      [1, 0.2],
    ],
    Co2ToPowerCurve: [
      [0.2, 0.2],
      [0.4, 0.25],
      [0.6, 0.4],
      [0.8, 0.65],
      [1, 1],
    ],
    Co2ToPowerCurveQuadratic: true,
    priceToCo2CurveQuadratic: true,
    priceToPowerCurveQuadratic: true
  }

  coalPowerPlant3: CoalPowerPlant = {
    id: 0,
    name: "C3",
    power: 1000,
    co2: 820,
    fuelPrice: 258.00,
    priceToPowerCurve: [
      [0.2, 1],
      [0.4, 0.65],
      [0.6, 0.4],
      [0.8, 0.25],
      [1, 0.2],
    ],
    priceToCo2Curve: [
      [0.2, 1],
      [0.4, 0.95],
      [0.6, 0.8],
      [0.8, 0.6],
      [1, 0.2],
    ],
    Co2ToPowerCurve: [
      [0.2, 0.2],
      [0.4, 0.25],
      [0.6, 0.4],
      [0.8, 0.65],
      [1, 1],
    ],
    Co2ToPowerCurveQuadratic: true,
    priceToCo2CurveQuadratic: true,
    priceToPowerCurveQuadratic: true
  }

  coalPowerPlant4: CoalPowerPlant = {
    id: 0,
    name: "C4",
    power: 1000,
    co2: 820,
    fuelPrice: 258.00,
    priceToPowerCurve: [
      [0.2, 1],
      [0.4, 0.65],
      [0.6, 0.4],
      [0.8, 0.25],
      [1, 0.2],
    ],
    priceToCo2Curve: [
      [0.2, 1],
      [0.4, 0.95],
      [0.6, 0.8],
      [0.8, 0.6],
      [1, 0.2],
    ],
    Co2ToPowerCurve: [
      [0.2, 0.2],
      [0.4, 0.25],
      [0.6, 0.4],
      [0.8, 0.65],
      [1, 1],
    ],
    Co2ToPowerCurveQuadratic: true,
    priceToCo2CurveQuadratic: true,
    priceToPowerCurveQuadratic: true
  }

  gasPowerPlant1: GasPowerPlant = {
    id: 0,
    name: "G1",
    power: 1500,
    co2: 490,
    fuelPrice: 3277.00,
    priceToPowerCurve: [
      [0.2, 1],
      [0.4, 0.65],
      [0.6, 0.4],
      [0.8, 0.25],
      [1, 0.2],
    ],
    priceToCo2Curve: [
      [0.2, 1],
      [0.4, 0.95],
      [0.6, 0.8],
      [0.8, 0.6],
      [1, 0.2],
    ],
    Co2ToPowerCurve: [
      [0.2, 0.2],
      [0.4, 0.25],
      [0.6, 0.4],
      [0.8, 0.65],
      [1, 1],
    ],
    Co2ToPowerCurveQuadratic: true,
    priceToCo2CurveQuadratic: true,
    priceToPowerCurveQuadratic: true
  }

  gasPowerPlant2: GasPowerPlant = {
    id: 0,
    name: "G2",
    power: 1000,
    co2: 490,
    fuelPrice: 3277.00,
    priceToPowerCurve: [
      [0.2, 1],
      [0.4, 0.65],
      [0.6, 0.4],
      [0.8, 0.25],
      [1, 0.2],
    ],
    priceToCo2Curve: [
      [0.2, 1],
      [0.4, 0.95],
      [0.6, 0.8],
      [0.8, 0.6],
      [1, 0.2],
    ],
    Co2ToPowerCurve: [
      [0.2, 0.2],
      [0.4, 0.25],
      [0.6, 0.4],
      [0.8, 0.65],
      [1, 1],
    ],
    Co2ToPowerCurveQuadratic: true,
    priceToCo2CurveQuadratic: true,
    priceToPowerCurveQuadratic: true
  }

  gasPowerPlant3: GasPowerPlant = {
    id: 0,
    name: "G3",
    power: 500,
    co2: 490,
    fuelPrice: 3277.00,
    priceToPowerCurve: [
      [0.2, 1],
      [0.4, 0.65],
      [0.6, 0.4],
      [0.8, 0.25],
      [1, 0.2],
    ],
    priceToCo2Curve: [
      [0.2, 1],
      [0.4, 0.95],
      [0.6, 0.8],
      [0.8, 0.6],
      [1, 0.2],
    ],
    Co2ToPowerCurve: [
      [0.2, 0.2],
      [0.4, 0.25],
      [0.6, 0.4],
      [0.8, 0.65],
      [1, 1],
    ],
    Co2ToPowerCurveQuadratic: true,
    priceToCo2CurveQuadratic: true,
    priceToPowerCurveQuadratic: true
  }

  gasPowerPlant4: GasPowerPlant = {
    id: 0,
    name: "G4",
    power: 500,
    co2: 490,
    fuelPrice: 3277.00,
    priceToPowerCurve: [
      [0.2, 1],
      [0.4, 0.65],
      [0.6, 0.4],
      [0.8, 0.25],
      [1, 0.2],
    ],
    priceToCo2Curve: [
      [0.2, 1],
      [0.4, 0.95],
      [0.6, 0.8],
      [0.8, 0.6],
      [1, 0.2],
    ],
    Co2ToPowerCurve: [
      [0.2, 0.2],
      [0.4, 0.25],
      [0.6, 0.4],
      [0.8, 0.65],
      [1, 1],
    ],
    Co2ToPowerCurveQuadratic: true,
    priceToCo2CurveQuadratic: true,
    priceToPowerCurveQuadratic: true
  }

  solarPowerPlant: SolarPowerPlant = {
    id: 0,
    name: 'S1',
    tiltAngle: 45,
    area: 7500,
    efficiency: 18
  }

  windPowerPlant: WindPowerPlant = {
    id: 0,
    name: 'W1',
    numOfTurbines: 11,
    bladeLength: 100,
    maxPower: 100
  }

  hydroPowerPlant: HydroPowerPlant = {
    id: 0,
    name: 'H1',
    power: 1150,
    cost: 0
  }

  coalPowerPlants: CoalPowerPlant[] = [this.coalPowerPlant1, this.coalPowerPlant2, this.coalPowerPlant3, this.coalPowerPlant4];
  gasPowerPlants: GasPowerPlant[] = [this.gasPowerPlant1, this.gasPowerPlant2, this.gasPowerPlant3, this.gasPowerPlant4];
  solarPowerPlants: SolarPowerPlant[] = [this.solarPowerPlant];
  windPowerPlants: WindPowerPlant[] = [this.windPowerPlant];
  hydroPowerPlants: HydroPowerPlant[] = [this.hydroPowerPlant];

  constructor(private toastr: ToastrService, private service: OptimizationService) { }

  files:File[] = [];
  result: any;

  hasUpload(event:any){
    this.files.push(event.target.files[0]);
  }

  models:any;
  fuelExpanditure: string[][] = []
  co2Production: string[][] = []

  ngOnInit(): void {
    this.service.getModels().subscribe({
      next: (data) => {
        this.models = data as Array<string>;
        this.models = this.models.data;
      },
      error: (error) => {
        this.toastr.error('Error! Backend not started!');
      }
    });

    this.showGraph = false;
    this.resetGraph();
  }

  resetGraph() {
    if(this.result) {

      this.chartOptions = {
        title: {
        text: "Production"             
        },
        animationEnabled: true,
        axisX: {      
          //valueFormatString: ""
        },
        toolTip: {
        shared: true,
        contentFormatter: function (e: any) {
          var content = '';
          for (var i = e.entries.length - 1; i >= 0; i--) {
          content += "<span style ='color:" + e.entries[i].dataSeries.color + "; font-weight: bold;';>" + e.entries[i].dataSeries.name + "</span>:" + e.entries[i].dataPoint.y + "MW";
          content += "<br/>";
          }
          return content;
        }
        },
        legend: {
        cursor: "pointer",
        itemclick: function(e: any) {
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
          }
          else {
          e.dataSeries.visible = true;
          }
          e.chart.render();
        }
        },
        data: [
          {
            type: "stackedArea",
            name: "H1",
            showInLegend: true,
            legendMarkerType: "square",
            markerSize: 0,
            color: "rgba(0,8,255,.9)",
            dataPoints: [
              {x: 0, y: 1},
              {x: 1, y: 1},
              {x: 2, y: 1},
              {x: 3, y: 1 },
              {x: 4, y: 1 },
              {x: 5, y: 1 },
              {x: 6, y: 1 },
              {x: 7, y: 1 },
              {x: 8, y: 1},
              {x: 9, y: 1},
              {x: 10, y: 1 },
              {x: 11, y: 1 },
              {x: 12, y: 1 },
              {x: 13, y: 1 },
              {x: 14, y: 1 },
              {x: 15, y: 1},
              {x: 16, y: 1},
              {x: 17, y: 1 },
              {x: 18, y: 1 },
              {x: 19, y: 1 },
              {x: 20, y: 1 },
              {x: 21, y: 1 },
              {x: 22, y: 1 },
              {x: 23, y: 1 }
              ]
          },
        {
          type: "stackedArea",
          name: "C1",
          showInLegend: true,
          legendMarkerType: "square",
          color: "rgba(51, 51, 51,.9)",
          markerSize: 0,
          dataPoints: [
          {x: 0, y: 1},
          {x: 1, y: 1},
          {x: 2, y: 1},
          {x: 3, y: 1 },
          {x: 4, y: 1 },
          {x: 5, y: 1 },
          {x: 6, y: 1 },
          {x: 7, y: 1 },
          {x: 8, y: 1},
          {x: 9, y: 1},
          {x: 10, y: 1 },
          {x: 11, y: 1 },
          {x: 12, y: 1 },
          {x: 13, y: 1 },
          {x: 14, y: 1 },
          {x: 15, y: 1},
          {x: 16, y: 1},
          {x: 17, y: 1 },
          {x: 18, y: 1 },
          {x: 19, y: 1 },
          {x: 20, y: 1 },
          {x: 21, y: 1 },
          {x: 22, y: 1 },
          {x: 23, y: 1 }
          ]
        },
        {
          type: "stackedArea",        
          name: "C2",
          showInLegend: true,
          legendMarkerType: "square",
          markerSize: 0,
          color: "rgba(77, 77, 77,.9)",
          dataPoints: [
            {x: 0, y: 1},
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 3, y: 1 },
            {x: 4, y: 1 },
            {x: 5, y: 1 },
            {x: 6, y: 1 },
            {x: 7, y: 1 },
            {x: 8, y: 1},
            {x: 9, y: 1},
            {x: 10, y: 1 },
            {x: 11, y: 1 },
            {x: 12, y: 1 },
            {x: 13, y: 1 },
            {x: 14, y: 1 },
            {x: 15, y: 1},
            {x: 16, y: 1},
            {x: 17, y: 1 },
            {x: 18, y: 1 },
            {x: 19, y: 1 },
            {x: 20, y: 1 },
            {x: 21, y: 1 },
            {x: 22, y: 1 },
            {x: 23, y: 1 }
            ]
        },            
        {
          type: "stackedArea",
          name: "C3",
          showInLegend: true,
          legendMarkerType: "square",
          markerSize: 0,
          color: "rgba(102, 102, 102,.9)",
          dataPoints: [
            {x: 0, y: 1},
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 3, y: 1 },
            {x: 4, y: 1 },
            {x: 5, y: 1 },
            {x: 6, y: 1 },
            {x: 7, y: 1 },
            {x: 8, y: 1},
            {x: 9, y: 1},
            {x: 10, y: 1 },
            {x: 11, y: 1 },
            {x: 12, y: 1 },
            {x: 13, y: 1 },
            {x: 14, y: 1 },
            {x: 15, y: 1},
            {x: 16, y: 1},
            {x: 17, y: 1 },
            {x: 18, y: 1 },
            {x: 19, y: 1 },
            {x: 20, y: 1 },
            {x: 21, y: 1 },
            {x: 22, y: 1 },
            {x: 23, y: 1 }
            ]
        },
        {
          legendMarkerType: "square",
          name: "C4",
          showInLegend: true,
          type: "stackedArea",
          markerSize: 0,
          color: "rgba(128, 128, 128,.9)",
          dataPoints: [
            {x: 0, y: 1},
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 3, y: 1 },
            {x: 4, y: 1 },
            {x: 5, y: 1 },
            {x: 6, y: 1 },
            {x: 7, y: 1 },
            {x: 8, y: 1},
            {x: 9, y: 1},
            {x: 10, y: 1 },
            {x: 11, y: 1 },
            {x: 12, y: 1 },
            {x: 13, y: 1 },
            {x: 14, y: 1 },
            {x: 15, y: 1},
            {x: 16, y: 1},
            {x: 17, y: 1 },
            {x: 18, y: 1 },
            {x: 19, y: 1 },
            {x: 20, y: 1 },
            {x: 21, y: 1 },
            {x: 22, y: 1 },
            {x: 23, y: 1 }
            ]
        },
        {
          type: "stackedArea",
          name: "G1",
          showInLegend: true,
          legendMarkerType: "square",
          color: "rgba(0,255,61,.9)",
          markerSize: 0,
          dataPoints: [
          {x: 0, y: 1},
          {x: 1, y: 1},
          {x: 2, y: 1},
          {x: 3, y: 1 },
          {x: 4, y: 1 },
          {x: 5, y: 1 },
          {x: 6, y: 1 },
          {x: 7, y: 1 },
          {x: 8, y: 1},
          {x: 9, y: 1},
          {x: 10, y: 1 },
          {x: 11, y: 1 },
          {x: 12, y: 1 },
          {x: 13, y: 1 },
          {x: 14, y: 1 },
          {x: 15, y: 1},
          {x: 16, y: 1},
          {x: 17, y: 1 },
          {x: 18, y: 1 },
          {x: 19, y: 1 },
          {x: 20, y: 1 },
          {x: 21, y: 1 },
          {x: 22, y: 1 },
          {x: 23, y: 1 }
          ]
        },
        {
          type: "stackedArea",        
          name: "G2",
          showInLegend: true,
          legendMarkerType: "square",
          markerSize: 0,
          color: "rgba(0,216,50,.9)",
          dataPoints: [
            {x: 0, y: 1},
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 3, y: 1 },
            {x: 4, y: 1 },
            {x: 5, y: 1 },
            {x: 6, y: 1 },
            {x: 7, y: 1 },
            {x: 8, y: 1},
            {x: 9, y: 1},
            {x: 10, y: 1 },
            {x: 11, y: 1 },
            {x: 12, y: 1 },
            {x: 13, y: 1 },
            {x: 14, y: 1 },
            {x: 15, y: 1},
            {x: 16, y: 1},
            {x: 17, y: 1 },
            {x: 18, y: 1 },
            {x: 19, y: 1 },
            {x: 20, y: 1 },
            {x: 21, y: 1 },
            {x: 22, y: 1 },
            {x: 23, y: 1 }
            ]
        },            
        {
          type: "stackedArea",
          name: "G3",
          showInLegend: true,
          legendMarkerType: "square",
          markerSize: 0,
          color: "rgba(37,196,74,.9)",
          dataPoints: [
            {x: 0, y: 1},
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 3, y: 1 },
            {x: 4, y: 1 },
            {x: 5, y: 1 },
            {x: 6, y: 1 },
            {x: 7, y: 1 },
            {x: 8, y: 1},
            {x: 9, y: 1},
            {x: 10, y: 1 },
            {x: 11, y: 1 },
            {x: 12, y: 1 },
            {x: 13, y: 1 },
            {x: 14, y: 1 },
            {x: 15, y: 1},
            {x: 16, y: 1},
            {x: 17, y: 1 },
            {x: 18, y: 1 },
            {x: 19, y: 1 },
            {x: 20, y: 1 },
            {x: 21, y: 1 },
            {x: 22, y: 1 },
            {x: 23, y: 1 }
            ]
        },
        {
          legendMarkerType: "square",
          name: "G4",
          showInLegend: true,
          type: "stackedArea",
          markerSize: 0,
          color: "rgba(66,255,110,.9)",
          dataPoints: [
            {x: 0, y: 1},
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 3, y: 1 },
            {x: 4, y: 1 },
            {x: 5, y: 1 },
            {x: 6, y: 1 },
            {x: 7, y: 1 },
            {x: 8, y: 1},
            {x: 9, y: 1},
            {x: 10, y: 1 },
            {x: 11, y: 1 },
            {x: 12, y: 1 },
            {x: 13, y: 1 },
            {x: 14, y: 1 },
            {x: 15, y: 1},
            {x: 16, y: 1},
            {x: 17, y: 1 },
            {x: 18, y: 1 },
            {x: 19, y: 1 },
            {x: 20, y: 1 },
            {x: 21, y: 1 },
            {x: 22, y: 1 },
            {x: 23, y: 1 }
            ]
        },
        {
          type: "stackedArea",
          name: "S1",
          showInLegend: true,
          legendMarkerType: "square",
          color: "rgba(255,255,0,.9)",
          markerSize: 0,
          dataPoints: [
          {x: 0, y: 1},
          {x: 1, y: 1},
          {x: 2, y: 1},
          {x: 3, y: 1 },
          {x: 4, y: 1 },
          {x: 5, y: 1 },
          {x: 6, y: 1 },
          {x: 7, y: 1 },
          {x: 8, y: 1},
          {x: 9, y: 1},
          {x: 10, y: 1 },
          {x: 11, y: 1 },
          {x: 12, y: 1 },
          {x: 13, y: 1 },
          {x: 14, y: 1 },
          {x: 15, y: 1},
          {x: 16, y: 1},
          {x: 17, y: 1 },
          {x: 18, y: 1 },
          {x: 19, y: 1 },
          {x: 20, y: 1 },
          {x: 21, y: 1 },
          {x: 22, y: 1 },
          {x: 23, y: 1 }
          ]
        },
        {
          type: "stackedArea",        
          name: "W1",
          showInLegend: true,
          legendMarkerType: "square",
          markerSize: 0,
          color: "rgba(238,238,238,.9)",
          dataPoints: [
            {x: 0, y: 1},
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 3, y: 1 },
            {x: 4, y: 1 },
            {x: 5, y: 1 },
            {x: 6, y: 1 },
            {x: 7, y: 1 },
            {x: 8, y: 1},
            {x: 9, y: 1},
            {x: 10, y: 1 },
            {x: 11, y: 1 },
            {x: 12, y: 1 },
            {x: 13, y: 1 },
            {x: 14, y: 1 },
            {x: 15, y: 1},
            {x: 16, y: 1},
            {x: 17, y: 1 },
            {x: 18, y: 1 },
            {x: 19, y: 1 },
            {x: 20, y: 1 },
            {x: 21, y: 1 },
            {x: 22, y: 1 },
            {x: 23, y: 1 }
            ]
        },
        {
          type: "stackedArea",        
          name: "Missing",
          showInLegend: true,
          legendMarkerType: "square",
          markerSize: 0,
          color: "rgba(255,0,0,.9)",
          dataPoints: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 3, y: 0 },
            {x: 4, y: 0 },
            {x: 5, y: 0 },
            {x: 6, y: 0 },
            {x: 7, y: 0 },
            {x: 8, y: 0},
            {x: 9, y: 0},
            {x: 10, y: 0 },
            {x: 11, y: 0 },
            {x: 12, y: 0 },
            {x: 13, y: 0 },
            {x: 14, y: 0 },
            {x: 15, y: 0},
            {x: 16, y: 0},
            {x: 17, y: 0 },
            {x: 18, y: 0 },
            {x: 19, y: 0 },
            {x: 20, y: 0 },
            {x: 21, y: 0 },
            {x: 22, y: 0 },
            {x: 23, y: 0 }
            ]
        },            
        ]
      }
      
      let arr = this.chartOptions['data'][0]['dataPoints'];
      this.result['H1'].forEach((element: number, index: number) => {
        arr[index]['y'] = element;
      });

      this.chartOptions['data'][0]['dataPoints'] = arr;

      this.result['C1'].forEach((element: number, index: number) => {
        if (element <= this.coalPowerPlant1.power)
          this.chartOptions['data'][1]['dataPoints'][index]['y'] = element;
        else {
          this.chartOptions['data'][1]['dataPoints'][index]['y'] = this.coalPowerPlant1.power;
          this.chartOptions['data'][11]['dataPoints'][index]['y'] += element - this.coalPowerPlant1.power;
        }
      });
      this.result['C2'].forEach((element: number, index: number) => {
        if (element <= this.coalPowerPlant2.power)
          this.chartOptions['data'][2]['dataPoints'][index]['y'] = element;
        else {
          this.chartOptions['data'][2]['dataPoints'][index]['y'] = this.coalPowerPlant2.power;
          this.chartOptions['data'][11]['dataPoints'][index]['y'] += element - this.coalPowerPlant2.power;
        }
      });
      this.result['C3'].forEach((element: number, index: number) => {
        if (element <= this.coalPowerPlant3.power)
          this.chartOptions['data'][3]['dataPoints'][index]['y'] = element;
        else {
          this.chartOptions['data'][3]['dataPoints'][index]['y'] = this.coalPowerPlant3.power;
          this.chartOptions['data'][11]['dataPoints'][index]['y'] += element - this.coalPowerPlant3.power;
        }
      });
      this.result['C4'].forEach((element: number, index: number) => {
        if (element <= this.coalPowerPlant4.power)
          this.chartOptions['data'][4]['dataPoints'][index]['y'] = element;
        else {
          this.chartOptions['data'][4]['dataPoints'][index]['y'] = this.coalPowerPlant4.power;
          this.chartOptions['data'][11]['dataPoints'][index]['y'] += element - this.coalPowerPlant4.power;
        }
      });
      this.result['G1'].forEach((element: number, index: number) => {
        if (element <= this.gasPowerPlant1.power)
          this.chartOptions['data'][5]['dataPoints'][index]['y'] = element;
        else {
          this.chartOptions['data'][5]['dataPoints'][index]['y'] = this.gasPowerPlant1.power;
          this.chartOptions['data'][11]['dataPoints'][index]['y'] += element - this.gasPowerPlant1.power;
        }
      });
      this.result['G2'].forEach((element: number, index: number) => {
        if (element <= this.gasPowerPlant2.power)
          this.chartOptions['data'][6]['dataPoints'][index]['y'] = element;
        else {
          this.chartOptions['data'][6]['dataPoints'][index]['y'] = this.gasPowerPlant2.power;
          this.chartOptions['data'][11]['dataPoints'][index]['y'] += element - this.gasPowerPlant2.power;
        }
      });
      this.result['G3'].forEach((element: number, index: number) => {
        if (element <= this.gasPowerPlant3.power)
          this.chartOptions['data'][7]['dataPoints'][index]['y'] = element;
        else {
          this.chartOptions['data'][7]['dataPoints'][index]['y'] = this.gasPowerPlant3.power;
          this.chartOptions['data'][11]['dataPoints'][index]['y'] += element - this.gasPowerPlant3.power;
        }
      });
      this.result['G4'].forEach((element: number, index: number) => {
        if (element <= this.gasPowerPlant4.power)
          this.chartOptions['data'][8]['dataPoints'][index]['y'] = element;
        else {
          this.chartOptions['data'][8]['dataPoints'][index]['y'] = this.gasPowerPlant4.power;
          this.chartOptions['data'][11]['dataPoints'][index]['y'] += element - this.gasPowerPlant4.power;
        }
      });
      this.result['S1'].forEach((element: number, index: number) => {
        this.chartOptions['data'][9]['dataPoints'][index]['y'] = element;
      });
      this.result['W1'].forEach((element: number, index: number) => {
        this.chartOptions['data'][10]['dataPoints'][index]['y'] = element;
      });
      this.showGraph = true;
    }
  }

  modelSelect = new FormGroup({
    model: new FormControl('', Validators.required)
  })
  criteriaSelect = new FormGroup({
    criteria: new FormControl('', Validators.required)
  })
  
  optimize() {
    if(this.modelSelect.valid && this.criteriaSelect.valid) {
      
      if(this.modelSelect.controls.model.value! == '') {
        this.toastr.error("Choose model!");
        return;
      }

      let optimizationParametes: OptimizationParameters = {
        model: this.modelSelect.controls.model.value!,
        criteria: this.criteriaSelect.controls.criteria.value!,
        coalGenerators: this.coalPowerPlants,
        gasGenerators: this.gasPowerPlants,
        solarGenerators: this.solarPowerPlants,
        windGenerators: this.windPowerPlants,
        hydroGenerators: this.hydroPowerPlants
      }
      
      this.service.optimize(optimizationParametes).subscribe({
        next: (data) => {
          this.result = data;
          this.result = this.result['data'];

          this.fuelExpanditure = [];
          this.co2Production = [];
          let arr: string[] = [];
          this.coalPowerPlants.forEach(element => {
            arr = [];
            arr.push(element.name);
            this.result[element.name + '_fuel'].forEach((element:any) => {
              arr.push((Math.floor(element)).toString());
            });
            this.fuelExpanditure.push(arr);

            arr = [];
            arr.push(element.name);
            this.result[element.name + '_co2'].forEach((element:any) => {
              arr.push((Math.floor(element)).toString());
            });
            this.co2Production.push(arr);
          });

          this.gasPowerPlants.forEach(element => {
            arr = [];
            arr.push(element.name);
            this.result[element.name + '_fuel'].forEach((element:any) => {
              arr.push((Math.floor(element)).toString());
            });
            this.fuelExpanditure.push(arr);

            arr = [];
            arr.push(element.name);
            this.result[element.name + '_co2'].forEach((element:any) => {
              arr.push((Math.floor(element)).toString());
            });
            this.co2Production.push(arr);
          });
          
          //this.showGraph = true;
          this.ngOnInit();
        },
        error: (error) => {
          this.toastr.error('Error!');
        }
      })
    }
    else {
      this.toastr.error("Fill all required fields!");
    }
  }


  //graph part
  showGraph = false;

  chartOptions = {
    title: {
    text: "Production"             
    },
    animationEnabled: true,
    axisX: {      
      //valueFormatString: ""
    },
    toolTip: {
    shared: true,
    contentFormatter: function (e: any) {
      var content = '';
      for (var i = e.entries.length - 1; i >= 0; i--) {
      content += "<span style ='color:" + e.entries[i].dataSeries.color + "; font-weight: bold;';>" + e.entries[i].dataSeries.name + "</span>:" + e.entries[i].dataPoint.y + "MW";
      content += "<br/>";
      }
      return content;
    }
    },
    legend: {
    cursor: "pointer",
    itemclick: function(e: any) {
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
      }
      else {
      e.dataSeries.visible = true;
      }
      e.chart.render();
    }
    },
    data: [
      {
        type: "stackedArea",
        name: "H1",
        showInLegend: true,
        legendMarkerType: "square",
        markerSize: 0,
        color: "rgba(0,8,255,.9)",
        dataPoints: [
          {x: 0, y: 1},
          {x: 1, y: 1},
          {x: 2, y: 1},
          {x: 3, y: 1 },
          {x: 4, y: 1 },
          {x: 5, y: 1 },
          {x: 6, y: 1 },
          {x: 7, y: 1 },
          {x: 8, y: 1},
          {x: 9, y: 1},
          {x: 10, y: 1 },
          {x: 11, y: 1 },
          {x: 12, y: 1 },
          {x: 13, y: 1 },
          {x: 14, y: 1 },
          {x: 15, y: 1},
          {x: 16, y: 1},
          {x: 17, y: 1 },
          {x: 18, y: 1 },
          {x: 19, y: 1 },
          {x: 20, y: 1 },
          {x: 21, y: 1 },
          {x: 22, y: 1 },
          {x: 23, y: 1 }
          ]
      },
    {
      type: "stackedArea",
      name: "C1",
      showInLegend: true,
      legendMarkerType: "square",
      color: "rgba(51, 51, 51,.9)",
      markerSize: 0,
      dataPoints: [
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 2, y: 1},
      {x: 3, y: 1 },
      {x: 4, y: 1 },
      {x: 5, y: 1 },
      {x: 6, y: 1 },
      {x: 7, y: 1 },
      {x: 8, y: 1},
      {x: 9, y: 1},
      {x: 10, y: 1 },
      {x: 11, y: 1 },
      {x: 12, y: 1 },
      {x: 13, y: 1 },
      {x: 14, y: 1 },
      {x: 15, y: 1},
      {x: 16, y: 1},
      {x: 17, y: 1 },
      {x: 18, y: 1 },
      {x: 19, y: 1 },
      {x: 20, y: 1 },
      {x: 21, y: 1 },
      {x: 22, y: 1 },
      {x: 23, y: 1 }
      ]
    },
    {
      type: "stackedArea",        
      name: "C2",
      showInLegend: true,
      legendMarkerType: "square",
      markerSize: 0,
      color: "rgba(77, 77, 77,.9)",
      dataPoints: [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1 },
        {x: 4, y: 1 },
        {x: 5, y: 1 },
        {x: 6, y: 1 },
        {x: 7, y: 1 },
        {x: 8, y: 1},
        {x: 9, y: 1},
        {x: 10, y: 1 },
        {x: 11, y: 1 },
        {x: 12, y: 1 },
        {x: 13, y: 1 },
        {x: 14, y: 1 },
        {x: 15, y: 1},
        {x: 16, y: 1},
        {x: 17, y: 1 },
        {x: 18, y: 1 },
        {x: 19, y: 1 },
        {x: 20, y: 1 },
        {x: 21, y: 1 },
        {x: 22, y: 1 },
        {x: 23, y: 1 }
        ]
    },            
    {
      type: "stackedArea",
      name: "C3",
      showInLegend: true,
      legendMarkerType: "square",
      markerSize: 0,
      color: "rgba(102, 102, 102,.9)",
      dataPoints: [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1 },
        {x: 4, y: 1 },
        {x: 5, y: 1 },
        {x: 6, y: 1 },
        {x: 7, y: 1 },
        {x: 8, y: 1},
        {x: 9, y: 1},
        {x: 10, y: 1 },
        {x: 11, y: 1 },
        {x: 12, y: 1 },
        {x: 13, y: 1 },
        {x: 14, y: 1 },
        {x: 15, y: 1},
        {x: 16, y: 1},
        {x: 17, y: 1 },
        {x: 18, y: 1 },
        {x: 19, y: 1 },
        {x: 20, y: 1 },
        {x: 21, y: 1 },
        {x: 22, y: 1 },
        {x: 23, y: 1 }
        ]
    },
    {
      legendMarkerType: "square",
      name: "C4",
      showInLegend: true,
      type: "stackedArea",
      markerSize: 0,
      color: "rgba(128, 128, 128,.9)",
      dataPoints: [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1 },
        {x: 4, y: 1 },
        {x: 5, y: 1 },
        {x: 6, y: 1 },
        {x: 7, y: 1 },
        {x: 8, y: 1},
        {x: 9, y: 1},
        {x: 10, y: 1 },
        {x: 11, y: 1 },
        {x: 12, y: 1 },
        {x: 13, y: 1 },
        {x: 14, y: 1 },
        {x: 15, y: 1},
        {x: 16, y: 1},
        {x: 17, y: 1 },
        {x: 18, y: 1 },
        {x: 19, y: 1 },
        {x: 20, y: 1 },
        {x: 21, y: 1 },
        {x: 22, y: 1 },
        {x: 23, y: 1 }
        ]
    },
    {
      type: "stackedArea",
      name: "G1",
      showInLegend: true,
      legendMarkerType: "square",
      color: "rgba(0,255,61,.9)",
      markerSize: 0,
      dataPoints: [
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 2, y: 1},
      {x: 3, y: 1 },
      {x: 4, y: 1 },
      {x: 5, y: 1 },
      {x: 6, y: 1 },
      {x: 7, y: 1 },
      {x: 8, y: 1},
      {x: 9, y: 1},
      {x: 10, y: 1 },
      {x: 11, y: 1 },
      {x: 12, y: 1 },
      {x: 13, y: 1 },
      {x: 14, y: 1 },
      {x: 15, y: 1},
      {x: 16, y: 1},
      {x: 17, y: 1 },
      {x: 18, y: 1 },
      {x: 19, y: 1 },
      {x: 20, y: 1 },
      {x: 21, y: 1 },
      {x: 22, y: 1 },
      {x: 23, y: 1 }
      ]
    },
    {
      type: "stackedArea",        
      name: "G2",
      showInLegend: true,
      legendMarkerType: "square",
      markerSize: 0,
      color: "rgba(0,216,50,.9)",
      dataPoints: [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1 },
        {x: 4, y: 1 },
        {x: 5, y: 1 },
        {x: 6, y: 1 },
        {x: 7, y: 1 },
        {x: 8, y: 1},
        {x: 9, y: 1},
        {x: 10, y: 1 },
        {x: 11, y: 1 },
        {x: 12, y: 1 },
        {x: 13, y: 1 },
        {x: 14, y: 1 },
        {x: 15, y: 1},
        {x: 16, y: 1},
        {x: 17, y: 1 },
        {x: 18, y: 1 },
        {x: 19, y: 1 },
        {x: 20, y: 1 },
        {x: 21, y: 1 },
        {x: 22, y: 1 },
        {x: 23, y: 1 }
        ]
    },            
    {
      type: "stackedArea",
      name: "G3",
      showInLegend: true,
      legendMarkerType: "square",
      markerSize: 0,
      color: "rgba(37,196,74,.9)",
      dataPoints: [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1 },
        {x: 4, y: 1 },
        {x: 5, y: 1 },
        {x: 6, y: 1 },
        {x: 7, y: 1 },
        {x: 8, y: 1},
        {x: 9, y: 1},
        {x: 10, y: 1 },
        {x: 11, y: 1 },
        {x: 12, y: 1 },
        {x: 13, y: 1 },
        {x: 14, y: 1 },
        {x: 15, y: 1},
        {x: 16, y: 1},
        {x: 17, y: 1 },
        {x: 18, y: 1 },
        {x: 19, y: 1 },
        {x: 20, y: 1 },
        {x: 21, y: 1 },
        {x: 22, y: 1 },
        {x: 23, y: 1 }
        ]
    },
    {
      legendMarkerType: "square",
      name: "G4",
      showInLegend: true,
      type: "stackedArea",
      markerSize: 0,
      color: "rgba(66,255,110,.9)",
      dataPoints: [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1 },
        {x: 4, y: 1 },
        {x: 5, y: 1 },
        {x: 6, y: 1 },
        {x: 7, y: 1 },
        {x: 8, y: 1},
        {x: 9, y: 1},
        {x: 10, y: 1 },
        {x: 11, y: 1 },
        {x: 12, y: 1 },
        {x: 13, y: 1 },
        {x: 14, y: 1 },
        {x: 15, y: 1},
        {x: 16, y: 1},
        {x: 17, y: 1 },
        {x: 18, y: 1 },
        {x: 19, y: 1 },
        {x: 20, y: 1 },
        {x: 21, y: 1 },
        {x: 22, y: 1 },
        {x: 23, y: 1 }
        ]
    },
    {
      type: "stackedArea",
      name: "S1",
      showInLegend: true,
      legendMarkerType: "square",
      color: "rgba(255,255,0,.9)",
      markerSize: 0,
      dataPoints: [
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 2, y: 1},
      {x: 3, y: 1 },
      {x: 4, y: 1 },
      {x: 5, y: 1 },
      {x: 6, y: 1 },
      {x: 7, y: 1 },
      {x: 8, y: 1},
      {x: 9, y: 1},
      {x: 10, y: 1 },
      {x: 11, y: 1 },
      {x: 12, y: 1 },
      {x: 13, y: 1 },
      {x: 14, y: 1 },
      {x: 15, y: 1},
      {x: 16, y: 1},
      {x: 17, y: 1 },
      {x: 18, y: 1 },
      {x: 19, y: 1 },
      {x: 20, y: 1 },
      {x: 21, y: 1 },
      {x: 22, y: 1 },
      {x: 23, y: 1 }
      ]
    },
    {
      type: "stackedArea",        
      name: "W1",
      showInLegend: true,
      legendMarkerType: "square",
      markerSize: 0,
      color: "rgba(238,238,238,.9)",
      dataPoints: [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1 },
        {x: 4, y: 1 },
        {x: 5, y: 1 },
        {x: 6, y: 1 },
        {x: 7, y: 1 },
        {x: 8, y: 1},
        {x: 9, y: 1},
        {x: 10, y: 1 },
        {x: 11, y: 1 },
        {x: 12, y: 1 },
        {x: 13, y: 1 },
        {x: 14, y: 1 },
        {x: 15, y: 1},
        {x: 16, y: 1},
        {x: 17, y: 1 },
        {x: 18, y: 1 },
        {x: 19, y: 1 },
        {x: 20, y: 1 },
        {x: 21, y: 1 },
        {x: 22, y: 1 },
        {x: 23, y: 1 }
        ]
    },            
    ]
  }


}