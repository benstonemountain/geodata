import { Component, Input } from '@angular/core';
import { WeatherInfo } from '../../model/weather-info';

@Component({
  selector: 'app-weather-info-card',
  templateUrl: './weather-info-card.component.html',
  styleUrl: './weather-info-card.component.css'
})
export class WeatherInfoCardComponent {

  @Input() weatherData!: WeatherInfo | null;

  convertWindSpeed(meterPerSec: number): number {
    //a m/s-ban megadott adatot km/h-vá alakítja
    return +(meterPerSec*3.6).toFixed(2);
  }

  getWindSpeedExplanation(speed: number): string {
    let exp = "";

    if(speed >= 0 && speed < 1) {
      exp="Calm";
    } else if(speed >= 1 && speed < 6) {
      exp="Light Air";
    } else if(speed >= 6 && speed <= 12) {
      exp="Light breeze"; 
    } else if(speed > 12 && speed < 20) {
      exp="Gentle breeze"; 
    } else if(speed >= 20 && speed <= 30) {
      exp="Moderate breeze"; 
    } else if(speed > 30 && speed < 40) {
      exp="Fresh breeze"; 
    }  else if(speed >= 40 && speed <= 50) {
      exp="Strong breeze"; 
    }  else if(speed > 50 && speed < 62) {
      exp="Near gale"; 
    }  else if(speed >= 62 && speed <= 75) {
      exp="Gale"; 
    }  else if(speed > 75 && speed < 89) {
      exp="Strong gale"; 
    }  else if(speed >= 89 && speed <= 103) {
      exp="Storm"; 
    } else if(speed > 103 && speed < 117) {
      exp="Violent storm"; 
    } else {
      exp = "Hurricane"
    }

    return exp;
  }

  getWindDirection(deg: number): string {
    let direction = "";
      if (deg <= 22.5 || deg >= 337.5  ) {
        direction = "North";
      } else if (deg > 22.5 && deg < 67.5) {
        direction = "Northeast";
      } else if (deg >= 67.5 && deg <= 112.5) {
        direction = "East";
      } else if (deg > 112.5 && deg < 157.5) {
          direction = "Southeast";
      } else if (deg >= 157.5 && deg <= 202.5) {
          direction = "South";
      } else if (deg > 202.5 && deg < 247.5) {
          direction = "Southwest";
      } else if (deg >= 247.5 && deg <= 292.5) {
          direction = "West";
      } else {
        direction = "Northwest"
      }

      return direction;
  }

  convertEpochTime(unixTime: number) {
    const unixTimeInMilliseconds: number = unixTime * 1000;
  }


}
