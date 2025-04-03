// src/app/services/carousel.service.ts
import {Injectable} from '@angular/core';
import {CarouselService} from '../interfaces/carousel-service';
import {CarouselTwoRows} from '../../models/interfaces/carousel';

@Injectable({
  providedIn: 'root'
})

export class JsonCarouselService implements CarouselService {
  constructor() {}

  async getCarouselTwoRowsFrom(src: string): Promise<CarouselTwoRows> {
    let res = await fetch(src)
    return res.json()
  }
}
