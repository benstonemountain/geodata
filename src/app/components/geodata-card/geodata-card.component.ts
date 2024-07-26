import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeoData } from '../../model/geo-data';

@Component({
  selector: 'app-geodata-card',
  templateUrl: './geodata-card.component.html',
  styleUrl: './geodata-card.component.css'
})
export class GeodataCardComponent {

  @Input() geoData!: GeoData;
  @Input() countryNames: { [key: string]: string } | null = {};

  @Output() emitingLatAndLon = new EventEmitter<{lat: number, lon: number}>;

  // constructor() {
  //   console.log("hello from constructor", this.geoData);
  // }
  // ngOnInit() {
  //   console.log("hello from ngOnInit", this.geoData);
  // }

  get countryName(): string {
    return this.countryNames?.[`${this.geoData.latitude},${this.geoData.longitude}`] || this.geoData.country;
  }

  onSearchWeatherInfo(latitude: number, longitude: number) {  
    const coordinations = {
      lat: latitude,
      lon: longitude
    }  
      this.emitingLatAndLon.emit(coordinations);

  }

}


// const card1 = new GeodataCardComponent()
// card1.geoData = gd;
// card1.countryNames = countryNames$;
// card1.ngOnInit();