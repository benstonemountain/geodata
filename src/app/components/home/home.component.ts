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

	searchForm = this.formBuilder.group({
		search: [''],
	});

	constructor(
		private formBuilder: FormBuilder,
		private geoStateService: GeoStateService,
		private weatherStateService: WeatherStateService,
    	private timeInfoStateService: TimeinfoStateService,
	) {}

	onCitySearch() {
		const userInput = this.searchForm.value.search;
		console.log(userInput);

		if (userInput) this.geoStateService.handleGeodataApi(userInput);
	}

	gettingLatAndLon(cor: { lat: number; lon: number }) {
		console.log(cor);
		this.weatherStateService.getWeatherData(cor);
    	this.timeInfoStateService.getTimeInfo(cor)
	}
}
