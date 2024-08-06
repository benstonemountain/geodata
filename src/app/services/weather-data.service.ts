import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WeatherInfo } from '../model/weather-info';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

basicWeatherApiUrl = environment.weatherApiUrl;
weatherApiKey = environment.weatherApiKey;

  constructor(private httpClient: HttpClient) { }

  fetchWeatherInfo(coordinates: {lat: number, lon: number}) {
    const { lat, lon } = coordinates;
    console.log(lat, lon);
    

    return this.httpClient.get<WeatherInfo>(`${this.basicWeatherApiUrl}?lat=${lat}&lon=${lon}&appid=${this.weatherApiKey}&units=metric&lang=en`)
  }




}
