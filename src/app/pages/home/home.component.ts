import { Component } from '@angular/core';
import {CarouselComponent} from '../../general/carousel/carousel.component';
import {IndexMarketingComponent} from '../../components/index-marketing/index-marketing.component';

@Component({
  selector: 'app-home',
  imports: [
    CarouselComponent,
    IndexMarketingComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  public carousel: string = "assets/jsons/carousel.json";
  public marketing: string = "assets/jsons/index-marketing.json";
  constructor() {}
}
