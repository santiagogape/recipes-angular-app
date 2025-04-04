import { CarouselTwoRows } from '../../models/interfaces/carousel';
import {Observable} from 'rxjs';

export interface CarouselService {
  getCarouselTwoRowsFrom(src: string): Observable<CarouselTwoRows>;
}
