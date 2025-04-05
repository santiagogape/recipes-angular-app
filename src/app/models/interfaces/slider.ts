import {ImageSrc} from './ImageSrc';
import {RecipesTestimonial} from './recipes.testimonial';


export interface GallerySlider {
  title: string
  images: ImageSrc[]
}

export interface TestimonialsSlider {
  title: string
  slides: {
    image: ImageSrc,
    testimonial: RecipesTestimonial,
    logo: ImageSrc
  }[]
}
