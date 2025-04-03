import {ImageSrc} from './ImageSrc';

interface Carousel {
  title: string;
  intro: string;
}

export interface CarouselTwoRows extends Carousel {
  normal: ImageSrc[];
  reverse: ImageSrc[];
}
