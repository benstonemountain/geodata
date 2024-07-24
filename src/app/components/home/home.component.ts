import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GeoStateService } from '../../services/geo-state.service';
import { map, Observable } from 'rxjs';
import { GeoData } from '../../model/geo-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  geoLocationData$!: Observable<GeoData[] | null>;
  countryNames$!: Observable<{ [key: string]: string }>;

  searchForm = this.formBuilder.group({
    search: [""],
  })

  constructor(private formBuilder: FormBuilder, private geoStateService: GeoStateService) {}

  ngOnInit() {
    this.geoLocationData$ = this.geoStateService.geoDataObservable$;
    this.countryNames$ = this.geoStateService.countryNameObservable$.pipe(
      map(countryNames => countryNames || {}) // Ensure it's an empty object if null
    );
  }

  onCitySearch() {
    const userInput = this.searchForm.value.search;
    console.log(userInput);

    if(userInput)
    this.geoStateService.handleGeodataApi(userInput);
    
  }



}
