import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AqiDataService } from './aqi-data.service';

@Injectable({
	providedIn: 'root',
})
export class AqiStateService {
	private _aqiDataSubject = new BehaviorSubject<any | null>(null);
	readonly aqiDataObservable$ = this._aqiDataSubject.asObservable();

	constructor(private aqiDataService: AqiDataService) {}

	getAqiInformation(coordinates: { lat: number; lon: number }) {
		this.aqiDataService.fetchAqiData(coordinates).subscribe({
			next: (fullPollutionInfo) => {
				const aqiInfo = fullPollutionInfo.list[0].components
				console.log(aqiInfo);
			
			},
			error: (err) => {
				console.log(err);
			},
		});
	}
}
