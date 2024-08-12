import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PollutionInfoCardComponent } from './components/pollution-info-card/pollution-info-card.component';

const routes: Routes = [
  {path: 'Home', component: HomeComponent},
  
  {path: 'pollution-info-page', component: PollutionInfoCardComponent},
  
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
