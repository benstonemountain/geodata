import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { GeodataCardComponent } from './components/geodata-card/geodata-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherInfoCardComponent } from './components/weather-info-card/weather-info-card.component';
import { TimeInfoCardComponent } from './components/time-info-card/time-info-card.component';
import { HeaderFormComponent } from './components/header-form/header-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GeodataCardComponent,
    GeodataCardComponent,
    WeatherInfoCardComponent,
    TimeInfoCardComponent,
    HeaderFormComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
