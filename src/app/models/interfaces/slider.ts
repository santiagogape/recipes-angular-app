import {ImageSrc} from './ImageSrc';
import {Testimonial} from './testimonial';


export interface GallerySlider {
  title: string
  images: ImageSrc[]
}

export interface TestimonialsSlider {
  title: string
  slides: {
    image: ImageSrc,
    testimonial: Testimonial,
    logo: ImageSrc
  }[]
}
