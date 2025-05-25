import {Component, inject} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import {SignInFormComponent} from "@pages/sign-in/form/form.component";
import {UserLogin} from "@models/my/user";
import {AuthService} from "@services/firebase/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, SignInFormComponent],
})
export class SignInPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  async signIn(user: UserLogin) {
    const userFire = await this.authService.signIn(
      user.email,
      user.password
    );
    console.log("userFire")
    console.log('Usuario registrado:', userFire);
    await this.router.navigate(['/tabs/my-recipes']);
  }
}
