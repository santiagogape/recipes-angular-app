import { Component } from '@angular/core';
import {CarouselComponent} from '../../general/carousel/carousel.component';

@Component({
  selector: 'app-home',
  imports: [
    CarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  public src: string = "assets/jsons/carousel.json";
  constructor() {}
}
