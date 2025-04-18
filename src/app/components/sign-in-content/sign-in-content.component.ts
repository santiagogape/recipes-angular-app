import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  credentials = {
    email: '',
    password: ''
  };

  showPassword = false;

  onSubmit() {
    console.log('Form submitted:', this.credentials);
    // Aquí iría la lógica de autenticación real
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
