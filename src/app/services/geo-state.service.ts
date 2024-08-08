import { Injectable } from '@angular/core';
import { GeoDataService } from './geo-data.service';
import { BehaviorSubject, forkJoin, map, switchMap, tap } from 'rxjs';
import { GeoData } from '../model/geo-data';

@Injectable({
  providedIn: 'root',
})
export class GeoStateService {
 

  private _geoDataSubject = new BehaviorSubject<GeoData[] | null>(null);
  readonly geoDataObservable$ = this._geoDataSubject.asObservable();

  private _errorMessageSubject = new BehaviorSubject<boolean>(false);
  readonly errorMessageObservable$ = this._errorMessageSubject.asObservable();

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

        tap((geoData) => {
          console.log('Original geoData:', geoData);
          if (geoData.length === 0) {
            console.error('nem jött vissza semmi');
            this.onOpenErrorMessageWindow();
            this._geoDataSubject.next(null);

            // this._errorMessageSubject.pipe(
            //   tap(value => console.log('Error Message Subject Value:', value))
            // ).subscribe();
          } 
       
      }),
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

          let filteredGeoDataArray: GeoData[] = [];

          geodata.forEach(item => {
            const isAlreadyInFiltered = filteredGeoDataArray.some(filteredItem => 
              filteredItem.name === item.name && filteredItem.country === item.country &&
              filteredItem.state === item.state
            );
          
            if (!isAlreadyInFiltered) {
              filteredGeoDataArray.push(item);
            }
          });

          console.log(filteredGeoDataArray);

          this._geoDataSubject.next(filteredGeoDataArray);
        },

        error: (err) => {
          console.log(err);
        },
      });
    
  }

  onCloseErrorMessageWindow() {
      this._errorMessageSubject.next(false);
  }
  onOpenErrorMessageWindow() {
      this._errorMessageSubject.next(true);
  }

}
