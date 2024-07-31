import { Component, Input, SimpleChanges } from '@angular/core';
import { TimeInfo } from '../../model/time-info';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-time-info-card',
  templateUrl: './time-info-card.component.html',
  styleUrl: './time-info-card.component.css'
})
export class TimeInfoCardComponent {

  @Input() timeInfo$!: Observable<TimeInfo | null>;

 
  localTime: string = '';
  intervalId: any;

  ngOnInit() {
    // Start the time update when the component is initialized
    this.startUpdatingTime();
  }



  startUpdatingTime() {

    this.timeInfo$.subscribe( (data) => {
    if (data?.ianaTimeId) {
      this.updateLocalTime(data?.ianaTimeId);
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.updateLocalTime(data?.ianaTimeId);
      }, 1000);
    }

    })


  }

  updateLocalTime(timeZone: string) {
    this.localTime = this.getLocalTime(timeZone);
  }

  getLocalTime(tz: string | undefined): string {
    if (tz) {
      const currentDate = new Date().toLocaleTimeString('hu-HU', { timeZone: tz, timeZoneName: 'shortOffset' });
      return currentDate;
    }
  return "1";
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
