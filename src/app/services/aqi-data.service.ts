import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AqiDataService {
	aqiDataBasicUrl = environment.airPollutionDataUrl;
	weatherApiKey = environment.weatherApiKey;

	constructor(private httpClient: HttpClient) {}

	fetchAqiData(coordinates: { lat: number; lon: number }) {
		const { lat, lon } = coordinates;

	return	this.httpClient.get<any>(
			this.aqiDataBasicUrl+`?lat=${lat}&lon=${lon}&appid=${this.weatherApiKey}`
		);
	}
}
