import { Component } from '@angular/core';
import {CarouselComponent} from '../../components/general/carousel/carousel.component';
import {IndexMarketingComponent} from '../../components/home/index.marketing/index.marketing.component';
import {SliderComponent} from '../../components/general/slider/slider.component';


@Component({
  selector: 'home',
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
  public carousel: string = "assets/general/carousel.json";
  public marketing: string = "assets/home/index.marketing.json";
  public slider: string = "assets/home/index.slider.json";
    public type: string = "gallery";
  constructor() {}
}
