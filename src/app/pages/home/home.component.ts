import { Component } from '@angular/core';
import {CarouselComponent} from '../../general/carousel/carousel.component';
import {IndexMarketingComponent} from '../../components/index-marketing/index-marketing.component';
import {SliderComponent} from '../../general/slider/slider.component';

@Component({
  selector: 'app-home',
  imports: [
    CarouselComponent,
    IndexMarketingComponent,
    SliderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  public carousel: string = "assets/jsons/carousel.json";
  public marketing: string = "assets/jsons/index-marketing.json";
  public slider: string = "assets/jsons/index-slider.json";
    public type: string = "gallery";
  constructor() {}
}
