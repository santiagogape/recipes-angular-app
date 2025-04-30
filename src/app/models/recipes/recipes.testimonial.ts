import {ID} from '@services/firebase/databaseAPI';
import {AuthorRecipe, AuthorRecipeData} from '@models/general/AuthorRecipePair';
import {User} from '@models/my/user';

interface Testimonial extends ID {
  valuation: number,
  description: string
}

export interface RecipesTestimonial extends Testimonial{
  author: string, //user id
  recipe: AuthorRecipe
}

export interface RecipesTestimonialData extends Testimonial{
  author: User, //user id
  recipe: AuthorRecipeData
}
