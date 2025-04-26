import {ImageSrc} from './ImageSrc';
import {RecipesTestimonial} from '../recipes/recipes.testimonial';
import {ID} from '@services/firebase/databaseAPI';


export interface GallerySlider extends ID{
  title: string
  images: ImageSrc[]
}

export interface TestimonialsSlider extends ID{
  title: string
  slides: {
    image: ImageSrc,
    testimonial: RecipesTestimonial,
    logo: ImageSrc
  }[]
}
