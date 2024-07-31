import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TimeInfo } from '../model/time-info';

@Injectable({
  providedIn: 'root'
})
export class TimeinfoDataService {

  timeInfoApiUrl = environment.timeInfoApiUrl;
  timeInfoApiKey = environment.timeInfoApiKey

  constructor(private httpClient: HttpClient) { }




  fetchTimeInfo(coordinates: {lat: number, lon: number}) {
    const { lat, lon } = coordinates;
    console.log(lat, lon);

    return this.httpClient.get<TimeInfo>(this.timeInfoApiUrl+`?latitude=${lat}&longitude=${lon}&key=${this.timeInfoApiKey}`);

  }
}
