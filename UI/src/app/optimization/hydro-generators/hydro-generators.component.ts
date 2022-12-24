import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HydroPowerPlant } from 'src/app/types';

@Component({
  selector: 'app-hydro-generators',
  templateUrl: './hydro-generators.component.html',
  styleUrls: ['./hydro-generators.component.css']
})
export class HydroGeneratorsComponent {
  @Input() powerPlantsList: HydroPowerPlant[] = []; 
  panelOpenState = false;

  powerPlant = new FormGroup({
    name: new FormControl("", Validators.required),
    power: new FormControl(0, Validators.required),
  });

  removePowerPlant(id: number) {
    this.powerPlantsList.splice(id,1);
  }

  addNewGenerator() {
    if(this.powerPlant.valid)
    {
      let gen: HydroPowerPlant = {
        id: this.powerPlantsList.length,
        name: this.powerPlant.controls.name.value!,
        power: this.powerPlant.controls.power.value!,
      }
      this.powerPlantsList.push(gen);

      this.powerPlant.reset();
    }
  }
}
