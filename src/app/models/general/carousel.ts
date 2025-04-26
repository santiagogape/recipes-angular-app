import {ImageSrc} from './ImageSrc';
import {Header, HeaderInitializer} from './header';
import {ID} from '@services/firebase/databaseAPI';

export interface CarouselTwoRows extends ID{
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
