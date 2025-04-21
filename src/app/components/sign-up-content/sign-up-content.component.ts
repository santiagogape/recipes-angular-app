import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sign-up-content',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-up-content.component.html',
  styleUrls: ['./sign-up-content.component.css']
})
export class SignUpContentComponent {
  @Input() signUpImageUrl: string = 'https://images.unsplash.com/photo-1595834895565-74fdb5fc3488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczODg2NTY5M3w&ixlib=rb-4.0.3&q=80&w=1400';

  user = {
    username: '',
    email: '',
    password: ''
  };

  @Input() showTitle: boolean = true;
  @Input() redirectOnSubmit: string | null = '/welcome';

  onSubmit() {
    console.log('Form submitted:', this.user);
    // Aquí iría la lógica de registro real
  }

  togglePasswordVisibility(field: HTMLInputElement) {
    field.type = field.type === 'password' ? 'text' : 'password';
  }
}
