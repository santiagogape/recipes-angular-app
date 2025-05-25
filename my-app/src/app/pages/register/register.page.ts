import {Component, inject} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import {SignUpFormComponent} from "@pages/register/form/form.component";
import {AuthService} from "@services/firebase/auth.service";
import {Router} from "@angular/router";
import {UserRegister} from "@models/my/user";
import {StorageService} from "@services/firebase/storage.service";
import {FirestoreService} from "@services/firebase/firestore.service";
import {User} from "@models/my/user";

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, SignUpFormComponent]
})
export class RegisterPage {
  private authService = inject(AuthService);
  storage  = inject(StorageService);
  firestore = inject(FirestoreService);
  private router = inject(Router);

  constructor() {}


  async signUp(data: {user: UserRegister, image: File}) {

    const userFire = await this.authService.signUp(
      data.user.email,
      data.user.password,
      data.user.username
    );

    let file = data.image
    if (file && file.size > 0 && file.name){
      let url = await this.storage.uploadFile(data.image, "users",userFire,"picture")
      await this.firestore.updateDocument<User>(userFire,
        {id: userFire, email: data.user.email, job: "user", name: data.user.username, picture: url},
        "users");
      console.log('Usuario registrado:', userFire, url);
    }
    console.log('Usuario registrado:', userFire);
    await this.router.navigate(['/tabs/my-recipes']);
  }
}
