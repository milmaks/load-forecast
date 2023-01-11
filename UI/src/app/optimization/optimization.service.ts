import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OptimizationParameters } from '../types';

@Injectable({
  providedIn: 'root'
})
export class OptimizationService {

  constructor(private http: HttpClient) { }

  getModels() {
    return this.http.get(environment.forecastServerURL);
  }

  optimize(optimizationParametes: OptimizationParameters) {
    return this.http.post(environment.optimizationServerURL + '/api/optimize', optimizationParametes);
  }
}
