import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pollution-info-card',
  templateUrl: './pollution-info-card.component.html',
  styleUrl: './pollution-info-card.component.css'
})
export class PollutionInfoCardComponent {


  constructor() {}

  onPush() {
    // console.log("megnyomtam");
    // this.route.navigate(['/some']);
    // this.location.back(); --> visszaviszoda, ahonnan legutoljára navigáltál ide
  }

  asd() {
    console.log("a chrome egy buzi")
  }

}
