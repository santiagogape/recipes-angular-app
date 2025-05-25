import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ViewWillLeave } from '@ionic/angular';
import {UserLogin} from "@models/my/user";



@Component({
  selector: 'app-sign-in-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class SignInFormComponent implements ViewWillLeave {
  private fb = inject(FormBuilder);


  session = output<UserLogin>()

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/),
      ],
    ],
  });

  get user(): UserLogin {
    return {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    };
  }

  async onSubmit() {
    if (this.form.valid) {
      console.log("valido")
      this.session.emit(this.user)
    } else {
      this.form.markAllAsTouched();
    }
  }

  ionViewWillLeave() {
    this.form.reset();
  }
}
