import { Injectable } from '@angular/core';
import {SliderService} from '../interfaces/slider.service';
import {Observable} from 'rxjs';
import {GallerySlider, TestimonialsSlider} from '../../models/interfaces/slider';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonSliderService implements SliderService {
  private http: HttpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
  constructor() {}

  getGallery(src: string): Observable<GallerySlider> {
    return this.http.get<GallerySlider>(src).pipe();
  }

  getTestimonials(src: string): Observable<TestimonialsSlider> {
    return this.http.get<TestimonialsSlider>(src).pipe();
  }

}
