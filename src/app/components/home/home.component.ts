import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GeoStateService } from '../../services/geo-state.service';
import { map, Observable } from 'rxjs';
import { GeoData } from '../../model/geo-data';
import { WeatherStateService } from '../../services/weather-state.service';
import { TimeinfoStateService } from '../../services/timeinfo-state.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
})
export class HomeComponent {
		geoLocationData$: Observable<GeoData[] | null> =
		this.geoStateService.geoDataObservable$;

	countryNames$: Observable<{ [key: string]: string }> =
		this.geoStateService.countryNameObservable$.pipe(
			map((countryNames) => countryNames || {}),
		);

	weatherData$ = this.weatherStateService.arrivingWeatherInfoObs$;
  	timeData$ = this.timeInfoStateService.timeInfoObservable$;

	  selectedCardIndex: number | null = null;

	  citySearchError$: Observable<boolean> = this.geoStateService.errorMessageObservable$;


	constructor(
		private geoStateService: GeoStateService,
		private weatherStateService: WeatherStateService,
    	private timeInfoStateService: TimeinfoStateService,
	) {}



	gettingLatAndLon(cor: { lat: number; lon: number }, index: number) {
		console.log(cor);
		this.weatherStateService.getWeatherData(cor);
		this.timeInfoStateService.getTimeInfo(cor);
		this.selectedCardIndex = index; 
		console.log("selected index: ", this.selectedCardIndex);
		
	  }

	gettingCityName(cityName: string) {
		console.log(cityName);
		if (cityName) this.geoStateService.handleGeodataApi(cityName);
		this.weatherStateService.getWeatherData(null);
    	this.timeInfoStateService.getTimeInfo(null);
		this.selectedCardIndex = null;
	}

	onCloseErrorWindow(){
		this.geoStateService.onCloseErrorMessageWindow();
	}
	onOpenErrorWindow(){
		this.geoStateService.onOpenErrorMessageWindow();
	}
}
