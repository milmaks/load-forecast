import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  uploadFiles(formData : FormData){
    console.log(formData);
    return this.http.post<FormData>(environment.forecastServerURL + '/api/populate', formData);
  }
}
