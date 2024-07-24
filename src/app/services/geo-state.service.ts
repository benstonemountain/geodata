import { Injectable } from '@angular/core';
import { GeoDataService } from './geo-data.service';
import { BehaviorSubject, forkJoin, map } from 'rxjs';
import { GeoData } from '../model/geo-data';

@Injectable({
  providedIn: 'root'
})
export class GeoStateService {

  
  private _geoDataSubject = new BehaviorSubject<GeoData [] | null>(null);
  readonly geoDataObservable$ = this._geoDataSubject.asObservable();

  private _countryNameSubject = new BehaviorSubject<{ [key: string]: string }>({});
  readonly countryNameObservable$ = this._countryNameSubject.asObservable();
  
  constructor(private geoDataService: GeoDataService) { }


handleGeodataApi(city: string) {
  this.geoDataService.fetchGeoDataApi(city).subscribe({
    next: (geodata) => {
      console.log(geodata);
      this._geoDataSubject.next(geodata);
    },

    error: (err) => {
      console.log(err);
      
    }
  })

}

handleCountryNames(geoData: GeoData[]) {
  console.log("meghívódott");
  
  const countryNameObservables = geoData.map(data =>
    this.geoDataService.fetchCountryName(data.latitude, data.longitude).pipe(
      map(response => ({
        key: `${data.latitude},${data.longitude}`,
        country: response.country
      }))
    )
  );

  forkJoin(countryNameObservables).subscribe({
    next: (countryNames) => {
      const countryNamesMap: { [key: string]: string } = countryNames.reduce((acc: { [key: string]: string }, cur) => {
        acc[cur.key] = cur.country;
        return acc;
      }, {});
      this._countryNameSubject.next(countryNamesMap);
    },
    error: (err) => {
      console.log(err);
    }
  });

}
}
