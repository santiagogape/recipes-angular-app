import {Component, inject, Input, OnInit} from '@angular/core';
import {JsonCarouselService} from '../../services/instances/JsonCarouselService';
import {CarouselTwoRows} from '../../models/interfaces/carousel';

@Component({
  selector: 'carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  standalone: true
})
export class CarouselComponent implements OnInit {
  service = inject(JsonCarouselService)
  protected carousel: CarouselTwoRows = {  // Valor por defecto
    title: '',
    intro: '',
    normal: [],
    reverse: []
  };
  protected times: Array<number> = [1,2]
  @Input() src: string = "";
  constructor() {}

  ngOnInit() {
    if (this.src) {
      this.service.getCarouselTwoRowsFrom(this.src).then((carousel) => {
        this.carousel = carousel;
        console.log(carousel)
      });
    }
  }
}
