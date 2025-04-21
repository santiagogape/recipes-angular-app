import { Component } from '@angular/core';
import {ProfileContentComponent} from '../../../components/profile-content/profile-content.component';
import {FooterComponent} from '../../../components/general/footer/footer.component';

@Component({
  selector: 'app-profile',
  imports: [
    ProfileContentComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
