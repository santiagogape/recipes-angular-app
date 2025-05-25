import {Component, inject, output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ViewWillLeave} from '@ionic/angular';
import {UserRegister} from "@models/my/user";
import {IonButton, IonContent, IonInput, IonNote} from "@ionic/angular/standalone";
import {ImageDropzoneComponent} from "@pages/image-dropzone/image-dropzone.component";

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonInput, IonNote, IonButton, IonContent, ImageDropzoneComponent],
  selector: 'app-sign-up-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html'
})
export class SignUpFormComponent implements ViewWillLeave {
  private fb = inject(FormBuilder);
  image: File = new File([],"");

  session = output<{ user: UserRegister, image: File }>()

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
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

  get user(): UserRegister {
    return this.form.value;
  }

  async onSubmit() {
    if (this.form.valid) {
      console.log("valido")
      this.session.emit({user:this.user, image:this.image})
    } else {
      this.form.markAllAsTouched();
    }
  }

  ionViewWillLeave() {
    this.form.reset();
  }

  newImage(image: File) {
    this.image = image;
  }
}
