import {Header} from '../general/header';
import {Card} from '../general/card';

export interface RecipeTags {
  categories: string[];
  allergens: string[];
}

export interface RecipeDescription {
  intro: Card
  author: string
  icons: string[]
  tags: RecipeTags
  ingredients: Header[]
  steps: Header[]
  stars: number
  votes: number
}

export interface MyRecipesDescriptions {
  recipes: RecipeDescription[];
}
