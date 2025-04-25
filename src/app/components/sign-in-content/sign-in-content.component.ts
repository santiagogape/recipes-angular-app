import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '@services/firebase/auth.service';

@Component({
  selector: 'sign-in-content',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-in-content.component.html',
  styleUrls: ['./sign-in-content.component.css']
})
export class SignInContentComponent {
  @Input() showTitle: boolean = true;
  @Input() redirectOnSubmit: string | null = '/dashboard';
  @Input() showSignUpLink: boolean = true;
  authService = inject(AuthService);
  private router: Router =  inject(Router);

  credentials = {
    email: '',
    password: ''
  };
  showPassword = false;

  async onSubmit() {
    console.log('Form submitted:', this.credentials);
    // Aquí iría la lógica de autenticación real
    try {
      const userFire = await this.authService.signIn(
        this.credentials.email,
        this.credentials.password
      );
      console.log('Usuario iniciado:', this.credentials.email, 'con uid: ', this.authService.getCurrentUserId());
      // Redirigir o mostrar mensaje de éxito
      await this.router.navigate(['/home']); // o a donde quieras
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Muestra el error al usuario
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
