import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    power: 2000,
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

  coalPowerPlant2: CoalPowerPlant = {
    id: 0,
    name: "C2",
    power: 1500,
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

  coalPowerPlant3: CoalPowerPlant = {
    id: 0,
    name: "C3",
    power: 1000,
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

  coalPowerPlant4: CoalPowerPlant = {
    id: 0,
    name: "C4",
    power: 1000,
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

  gasPowerPlant1: GasPowerPlant = {
    id: 0,
    name: "G1",
    power: 1000,
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

  gasPowerPlant2: GasPowerPlant = {
    id: 0,
    name: "G2",
    power: 1000,
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

  gasPowerPlant3: GasPowerPlant = {
    id: 0,
    name: "G3",
    power: 500,
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

  gasPowerPlant4: GasPowerPlant = {
    id: 0,
    name: "G4",
    power: 500,
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
    area: 5500,
    efficiency: 18
  }

  windPowerPlant: WindPowerPlant = {
    id: 0,
    name: 'W1',
    numOfTurbines: 8,
    bladeLength: 100,
    maxPower: 100
  }

  hydroPowerPlant: HydroPowerPlant = {
    id: 0,
    name: 'H1',
    power: 800
  }

  coalPowerPlants: CoalPowerPlant[] = [this.coalPowerPlant1, this.coalPowerPlant2, this.coalPowerPlant3, this.coalPowerPlant4];
  gasPowerPlants: GasPowerPlant[] = [this.gasPowerPlant1, this.gasPowerPlant2, this.gasPowerPlant3, this.gasPowerPlant4];
  solarPowerPlants: SolarPowerPlant[] = [this.solarPowerPlant];
  windPowerPlants: WindPowerPlant[] = [this.windPowerPlant];
  hydroPowerPlants: HydroPowerPlant[] = [this.hydroPowerPlant];

  constructor(private toastr: ToastrService, private service: OptimizationService) { }

  files:File[] = [];

  hasUpload(event:any){
    this.files.push(event.target.files[0]);
  }

  models:any;

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
  }

  modelSelect = new FormGroup({
    model: new FormControl('', Validators.required)
  })
  
  optimize() {
    if(this.modelSelect.valid) {
      
      if(this.modelSelect.controls.model.value! == '') {
        this.toastr.error("Choose model!");
        return;
      }

      let optimizationParametes: OptimizationParameters = {
        model: this.modelSelect.controls.model.value!,
        coalGenerators: this.coalPowerPlants,
        gasGenerators: this.gasPowerPlants,
        solarGenerators: this.solarPowerPlants,
        windGenerators: this.windPowerPlants,
        hydroGenerators: this.hydroPowerPlants
      }
      
      this.service.optimize(optimizationParametes).subscribe({
        next: (data) => {

        },
        error: (error) => {
          this.toastr.error('Error!');
        }
      })
      
      this.toastr.success('Pass');
    }
    else {
      this.toastr.error("Fill all required fields!");
    }
  }
}
