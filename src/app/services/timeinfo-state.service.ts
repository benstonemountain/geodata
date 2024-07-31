import { Injectable } from '@angular/core';
import { TimeinfoDataService } from './timeinfo-data.service';
import { BehaviorSubject } from 'rxjs';
import { TimeInfo } from '../model/time-info';

@Injectable({
	providedIn: 'root',
})
export class TimeinfoStateService {
	private _timInfoSubject = new BehaviorSubject<TimeInfo | null>(null);
	readonly timeInfoObservable$ = this._timInfoSubject.asObservable();

	constructor(private timeInfoDataService: TimeinfoDataService) {}

	getTimeInfo(coordinates: { lat: number; lon: number }) {
		this.timeInfoDataService.fetchTimeInfo(coordinates).subscribe({
			next: (timeInfo) => {
				console.log(timeInfo);
        this._timInfoSubject.next(timeInfo);
			},

			error: (err) => {
				console.log(err);
			},
		});
	}
}
