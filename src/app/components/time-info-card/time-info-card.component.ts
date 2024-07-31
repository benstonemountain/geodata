import { Component, Input } from '@angular/core';
import { TimeInfo } from '../../model/time-info';

@Component({
  selector: 'app-time-info-card',
  templateUrl: './time-info-card.component.html',
  styleUrl: './time-info-card.component.css'
})
export class TimeInfoCardComponent {

  @Input() timeInfo!: TimeInfo | null;

}
