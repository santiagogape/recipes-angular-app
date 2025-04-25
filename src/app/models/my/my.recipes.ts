import {Header} from '@models/general/header';
import {Card, CardInitializer} from '@models/general/card';
import {ID} from '@services/firebase/firestore.service';

export interface RecipeTags {
  categories: string[];
  allergens: string[];
}

function RecipeTagsInit():RecipeTags {
  return {categories:[], allergens:[]};
}

export interface RecipeDescription {
  intro: Card
  author: string
  icons: string[]
  tags: RecipeTags
}

function RecipeDescriptionInit(): RecipeDescription{
  return {author: '', icons: [], intro: CardInitializer(), tags: RecipeTagsInit()}
}

export interface Recipe extends ID{
  description: RecipeDescription
  ingredients: Header[]
  steps: Header[]
  stars: number
  votes: number
}

export function RecipeInitializer():Recipe{
  return {
    description: RecipeDescriptionInit(),
    id: '',
    ingredients: [],
    stars: 0,
    steps: [],
    votes: 0
  }
}


