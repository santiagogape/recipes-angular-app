import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from "./components/general/footer/footer.component";
import { FirebaseTestService } from './services/firebase/firebase-connection.test';
import { environment } from '../../environment';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  /*
  constructor() {
    try {
      const testService = inject(FirebaseTestService);

      if (!environment.production) {
        this.runFirebaseTest(testService);
      }
    } catch (error) {
      console.error('Error al inyectar FirebaseTestService:', error);
    }
  }

  private async runFirebaseTest(service: FirebaseTestService): Promise<void> {
    try {
      await service.testConnection();
      console.log('Prueba de Firebase exitosa');
    } catch (error) {
      console.error('Error en la prueba:', error);
      // Opcional: Mostrar notificación al usuario
    }
  }*/
}
