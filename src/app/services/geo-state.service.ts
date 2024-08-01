import { Injectable } from '@angular/core';
import { GeoDataService } from './geo-data.service';
import { BehaviorSubject, forkJoin, map, switchMap } from 'rxjs';
import { GeoData } from '../model/geo-data';

@Injectable({
  providedIn: 'root',
})
export class GeoStateService {
  private _geoDataSubject = new BehaviorSubject<GeoData[] | null>(null);
  readonly geoDataObservable$ = this._geoDataSubject.asObservable();

  private _countryNameSubject = new BehaviorSubject<{ [key: string]: string }>(
    {}
  );
  readonly countryNameObservable$ = this._countryNameSubject.asObservable();

  constructor(private geoDataService: GeoDataService) {}

  handleGeodataApi(city: string) {
    console.log(city);
    
    this.geoDataService
      .fetchGeoDataApi(city)
      .pipe(
        switchMap((geoData) => 
          forkJoin(
            geoData.map((d) => 
              this.geoDataService.fetchCountryName(d.latitude, d.longitude).pipe(
                map((response) => {
                  console.log(response);
                  d.country = response.countryName;
                  return d;
                })
              )
              )
            )
          )
      )
      .subscribe({
        next: (geodata) => {
          console.log(geodata);

          this._geoDataSubject.next(geodata);
        },

        error: (err) => {
          console.log(err);
        },
      });
  }

}
