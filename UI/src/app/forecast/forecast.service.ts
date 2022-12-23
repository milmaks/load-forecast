import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { TrainingDates } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  uploadFiles(formData : FormData){
    return this.http.post<FormData>(environment.forecastServerURL + '/api/populate', formData);
  }

  trainModel(trainingDates: TrainingDates){
    return this.http.post<FormData>(environment.forecastServerURL + '/api/train', trainingDates);
  }
}
