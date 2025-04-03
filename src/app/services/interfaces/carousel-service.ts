import { CarouselTwoRows } from '../../models/interfaces/carousel';

export interface CarouselService {
  getCarouselTwoRowsFrom(src: string): Promise<CarouselTwoRows>;
}
