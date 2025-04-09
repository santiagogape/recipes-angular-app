import {ImageSrc} from './ImageSrc';
import {Header, HeaderInitializer} from './header';

export interface CarouselTwoRows {
  header: Header
  normal: ImageSrc[];
  reverse: ImageSrc[];
}

export function CarouselInitializer(){
  return new class implements CarouselTwoRows {
      header: Header = HeaderInitializer();
      normal: ImageSrc[] = [];
      reverse: ImageSrc[] = [];
  }
}
