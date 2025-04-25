import { CarouselTwoRows } from '@models/general/carousel';
import {Observable} from 'rxjs';

export interface CarouselService {
  getCarouselTwoRowsFrom(src: string): Observable<CarouselTwoRows>;
}
