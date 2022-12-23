import { Component, OnInit } from '@angular/core';
import { CoalPowerPlant, GasPowerPlant } from '../types';

@Component({
  selector: 'app-optimization',
  templateUrl: './optimization.component.html',
  styleUrls: ['./optimization.component.css']
})
export class OptimizationComponent implements OnInit {
  coalPowerPlant: CoalPowerPlant = {
    id: 0,
    name: "C1",
    power: 200,
    co2: 195.6,
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

  gasPowerPlant: GasPowerPlant = {
    id: 0,
    name: "G1",
    power: 250,
    co2: 0.36,
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

  coalPowerPlants: CoalPowerPlant[] = [this.coalPowerPlant];
  gasPowerPlants: GasPowerPlant[] = [this.gasPowerPlant];

  constructor() { }

  files:File[] = [];

  hasUpload(event:any){
    this.files.push(event.target.files[0]);
  }

  ngOnInit(): void {
    
  }
  
}
