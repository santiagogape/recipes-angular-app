// src/app/services/carousel.service.ts
import {inject, Injectable} from '@angular/core';
import {CarouselService} from '../interfaces/carousel.service';
import {CarouselTwoRows} from '../../models/general/carousel';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JsonCarouselService implements CarouselService {
  private http: HttpClient = inject(HttpClient)
  constructor() {}

  getCarouselTwoRowsFrom(src: string): Observable<CarouselTwoRows> {
    return this.http.get<CarouselTwoRows>(src).pipe()
  }
}
