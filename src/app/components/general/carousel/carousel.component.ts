import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {JsonCarouselService} from '@services/instances/general/json.carousel.service';
import {CarouselInitializer, CarouselTwoRows} from '@models/general/carousel';
import {CarouselService} from '@services/interfaces/general/carousel.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  standalone: true
})
export class CarouselComponent implements OnInit, OnDestroy {
  service:CarouselService = inject(JsonCarouselService)
  protected carousel: CarouselTwoRows = CarouselInitializer();
  protected times: Array<number> = [1,2]
  @Input() src: string = "";
  protected sub: Subscription = new Subscription();

  constructor() {}

  ngOnInit() {
    if (this.src) {
      this.sub = this.service.getCarouselTwoRowsFrom(this.src).subscribe(
        carousel => this.carousel = carousel
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
