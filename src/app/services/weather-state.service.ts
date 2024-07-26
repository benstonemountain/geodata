import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WeatherDataService } from './weather-data.service';
import { WeatherInfo } from '../model/weather-info';

@Injectable({
  providedIn: 'root'
})
export class WeatherStateService {


  _arrivingWeatherInfo$ = new BehaviorSubject<WeatherInfo | null>(null);
  arrivingWeatherInfoObs$ = this._arrivingWeatherInfo$.asObservable();

  constructor(private weatherDataService: WeatherDataService) { }

  getWeatherData(coordinates: {lat: number, lon: number}) {
    this.weatherDataService.fetchWeatherInfo(coordinates).subscribe(
      {
        next: (wi) => {
          console.log(wi);
          this._arrivingWeatherInfo$.next(wi);
        }, 

        error: (err) => {
          console.log(err);
          
        }
      }
    )
  }
}
