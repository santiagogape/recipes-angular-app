import {RecipesTestimonial} from '@models/recipes/recipes.testimonial';
import {ID} from '@services/firebase/databaseAPI';
import {AuthorRecipe} from '@models/general/AuthorRecipePair';

export interface GallerySlider extends ID{
  title: string
  recipes: AuthorRecipe[]
}

export interface TestimonialsSlider extends ID{
  title: string
  testimonials: RecipesTestimonial[]
}

