import {GallerySlider, TestimonialsSlider} from '../../models/general/slider';
import {Observable} from 'rxjs';

export interface SliderService {
  getGallery(src: string): Observable<GallerySlider>
  getTestimonials(src: string): Observable<TestimonialsSlider>
}
