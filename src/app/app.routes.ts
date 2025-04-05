import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {AboutUsComponent} from './pages/about.us/about.us.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent }
];
