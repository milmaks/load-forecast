import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrainingDates } from 'src/app/types';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent {

  constructor(private service: ForecastService, private toastr: ToastrService) {}

  trainingDates: TrainingDates = {
    dateFrom: Date.now.toString(),
    dateTo: Date.now.toString(),
  }

  trainModel() {
    this.service.trainModel(this.trainingDates).subscribe({
      next: (data) => {
        this.toastr.success('Training succesfull.');
      },
      error: (error) => {
        this.toastr.error('Error!');
      }
    });
  }

}
