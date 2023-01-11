import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ForecastService } from './forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(private service: ForecastService, private toastr: ToastrService) { }

  models:any;
  predicted = false;
  data = [];
  dates = [];

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

  dateMin = new Date(2018,1,1);

  testForm = new FormGroup({
    model: new FormControl(0, Validators.required),
    date: new FormControl(this.dateMin, Validators.required),
    days: new FormControl(0, Validators.required),
  });

  test() {
    if (this.testForm.invalid) {
      this.toastr.error('Fill all required fields!');
      return;
    }

    if (this.testForm.controls.model.value! == 0) {
      this.toastr.error('Fill all required fields!');
      return;
    }

    if (this.testForm.controls.days.value! == 0) {
      this.toastr.error('Fill all required fields!');
      return;
    }

    let formData = new FormData();
    formData.append('model', this.testForm.controls.model.value!.toString());
    formData.append('date', this.testForm.controls.date.value!.toString());
    formData.append('days', this.testForm.controls.days.value!.toString());

    this.service.test(formData).subscribe({
      next: (data) => {
        this.toastr.success('Test finished!');
        console.log(data);
        this.data = data.data;
        this.dates = data.dates;
        this.predicted = true;
      },
      error: (error) => {
        this.toastr.error('Error!');
        this.predicted = false;
      }
    });
  }

  csv() {
    this.service.csv().subscribe({
      next: (data) => {
        this.toastr.success('CSV saved!');
      },
      error: (error) => {
        this.toastr.error(error.error.error);
      }
    });
  }

}
