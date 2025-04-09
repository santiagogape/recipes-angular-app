import {inject, Injectable} from '@angular/core';
import {SliderService} from '../interfaces/slider.service';
import {Observable} from 'rxjs';
import {GallerySlider, TestimonialsSlider} from '../../models/general/slider';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonSliderService implements SliderService {
  private http: HttpClient = inject(HttpClient)
  constructor() {}

  getGallery(src: string): Observable<GallerySlider> {
    return this.http.get<GallerySlider>(src).pipe();
  }

  getTestimonials(src: string): Observable<TestimonialsSlider> {
    return this.http.get<TestimonialsSlider>(src).pipe();
  }
}
