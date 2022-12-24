import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CoalPowerPlant, GasPowerPlant, HydroPowerPlant, SolarPowerPlant, WindPowerPlant } from '../types';

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

  solarPowerPlant: SolarPowerPlant = {
    id: 0,
    name: 'S1',
    tiltAngle: 45,
    area: 250,
    efficiency: 18
  }

  windPowerPlant: WindPowerPlant = {
    id: 0,
    name: 'W1',
    numOfTurbines: 10,
    bladeLength: 100
  }

  hydroPowerPlant: HydroPowerPlant = {
    id: 0,
    name: 'H1',
    power: 200
  }

  coalPowerPlants: CoalPowerPlant[] = [this.coalPowerPlant];
  gasPowerPlants: GasPowerPlant[] = [this.gasPowerPlant];
  solarPowerPlants: SolarPowerPlant[] = [this.solarPowerPlant];
  windPowerPlants: WindPowerPlant[] = [this.windPowerPlant];
  hydroPowerPlants: HydroPowerPlant[] = [this.hydroPowerPlant];

  constructor(private toastr: ToastrService) { }

  files:File[] = [];

  hasUpload(event:any){
    this.files.push(event.target.files[0]);
  }

  ngOnInit(): void {
    
  }

  powerPlants = new FormGroup({
    coal: new FormControl(50, Validators.required),
    gas: new FormControl(20, Validators.required),
    solar: new FormControl(10, Validators.required),
    wind: new FormControl(10, Validators.required),
    hydro: new FormControl(10, Validators.required),
  });
  
  optimize() {
    if(this.powerPlants.valid) {
      let coal = this.powerPlants.controls.coal.value!;
      let gas = this.powerPlants.controls.gas.value!;
      let solar = this.powerPlants.controls.solar.value!;
      let wind = this.powerPlants.controls.wind.value!;
      let hydro = this.powerPlants.controls.hydro.value!;

      if(coal + gas + solar + wind + hydro != 100) {
        this.toastr.error("Sum of optimization parameters must be 100%");
        return;
      }
    }
  }
}
