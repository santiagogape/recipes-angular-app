import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from '../environment';

if (!environment.production) {
  console.log('Modo desarrollo - Ejecutando pruebas de conexión');
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
