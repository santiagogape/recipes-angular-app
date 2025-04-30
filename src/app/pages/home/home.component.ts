import {Component} from '@angular/core';
import {CarouselComponent} from '@components/general/carousel/carousel.component';
import {IndexMarketingComponent} from '@components/home/index.marketing/index.marketing.component';
import {ImageSliderComponent} from '@components/home/image.slider/image.slider.component';


@Component({
  selector: 'home',
  imports: [
    CarouselComponent,
    IndexMarketingComponent,
    ImageSliderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  root = "web"
  path = ["pages","home"]
  public carousel = "carousel";
  public carouselCollection = "recipes"
  public marketing = "assets/home/index.marketing.json";
  public gallery: string = "gallery";
  constructor() {}
}
