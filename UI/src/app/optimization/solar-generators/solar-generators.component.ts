import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolarPowerPlant } from 'src/app/types';

@Component({
  selector: 'app-solar-generators',
  templateUrl: './solar-generators.component.html',
  styleUrls: ['./solar-generators.component.css']
})
export class SolarGeneratorsComponent {
  @Input() powerPlantsList: SolarPowerPlant[] = []; 
  panelOpenState = false;

  powerPlant = new FormGroup({
    name: new FormControl("", Validators.required),
    tiltAngle: new FormControl(0, Validators.required),
    area: new FormControl(0, Validators.required),
    efficiency: new FormControl(0, Validators.required),
  });

  removePowerPlant(id: number) {
    this.powerPlantsList.splice(id,1);
  }

  addNewGenerator() {
    if(this.powerPlant.valid)
    {
      let gen: SolarPowerPlant = {
        id: this.powerPlantsList.length,
        name: this.powerPlant.controls.name.value!,
        tiltAngle: this.powerPlant.controls.tiltAngle.value!,
        area: this.powerPlant.controls.area.value!,
        efficiency: this.powerPlant.controls.efficiency.value!
      }
      this.powerPlantsList.push(gen);

      this.powerPlant.reset();
    }
  }
}
