import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeoData } from '../model/geo-data';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoDataService {

  geoLocationApiUrl = environment.geoApiUrl;
  geoLocationApiKey = environment.geoApiKey;
  countryNameApiUrl = environment.countryNameApi;

  constructor(private httpClient: HttpClient) { }


  fetchGeoDataApi(city: string) {
    const headers = new HttpHeaders ({
      'X-Api-Key' : this.geoLocationApiKey,
    });
   return this.httpClient.get<GeoData[]>(this.geoLocationApiUrl+`?city=${city}`, {headers});
  }

  fetchCountryName(latitude: number, longitude: number):Observable<{ countryName: string }> {
    // console.log(latitude);
    // console.log(longitude);
    
    return this.httpClient.get<{ countryName: string }>(`${this.countryNameApiUrl}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=bdc_2507cb4e967141d89d8c55914ba87d7d`);
  }
}
