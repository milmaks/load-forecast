import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WindPowerPlant } from 'src/app/types';

@Component({
  selector: 'app-wind-generators',
  templateUrl: './wind-generators.component.html',
  styleUrls: ['./wind-generators.component.css']
})
export class WindGeneratorsComponent {
  @Input() powerPlantsList: WindPowerPlant[] = []; 
  panelOpenState = false;

  powerPlant = new FormGroup({
    name: new FormControl("", Validators.required),
    numOfTurbines: new FormControl(0, Validators.required),
    bladeLength: new FormControl(0, Validators.required),
  });

  removePowerPlant(id: number) {
    this.powerPlantsList.splice(id,1);
  }

  addNewGenerator() {
    if(this.powerPlant.valid)
    {
      let gen: WindPowerPlant = {
        id: this.powerPlantsList.length,
        name: this.powerPlant.controls.name.value!,
        numOfTurbines: this.powerPlant.controls.numOfTurbines.value!,
        bladeLength: this.powerPlant.controls.bladeLength.value!,
      }
      this.powerPlantsList.push(gen);

      this.powerPlant.reset();
    }
  }
}
