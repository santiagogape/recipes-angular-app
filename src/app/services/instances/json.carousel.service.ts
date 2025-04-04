// src/app/services/carousel.service.ts
import { Injectable} from '@angular/core';
import {CarouselService} from '../interfaces/carousel.service';
import {CarouselTwoRows} from '../../models/interfaces/carousel';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JsonCarouselService implements CarouselService {
  private http: HttpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }))
  constructor() {}

  getCarouselTwoRowsFrom(src: string): Observable<CarouselTwoRows> {
    return this.http.get<CarouselTwoRows>(src).pipe()
  }
}
