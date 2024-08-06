import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-city-search-error',
  templateUrl: './city-search-error.component.html',
  styleUrl: './city-search-error.component.css'
})
export class CitySearchErrorComponent {

  @Input() citySearchError$ = new Observable<boolean>;

}