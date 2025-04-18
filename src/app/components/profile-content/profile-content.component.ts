import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'profile-content',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent {
  @Input() profileImage: string = '';
  @Input() username: string = '';
  @Input() email: string = '';

  profileData = {
    username: this.username,
    email: this.email
  };

  passwordData = {
    oldPassword: '',
    newPassword: ''
  };

  updateProfile() {
    console.log('Updating profile:', this.profileData);
    // Lógica para actualizar el perfil
  }

  updatePassword() {
    console.log('Updating password:', this.passwordData);
    // Lógica para actualizar la contraseña
  }
}
