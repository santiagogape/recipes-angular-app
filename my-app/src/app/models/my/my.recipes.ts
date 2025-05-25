import {Header} from '@models/general/header';
import {Card, CardInitializer} from '@models/general/card';
import {ID} from '@services/firebase/databaseAPI';

export interface RecipeTags extends ID{
  categories: string[];
  allergens: string[];
}

function RecipeTagsInit():RecipeTags {
  return {categories:[], allergens:[], id:""};
}

export interface RecipeDescription {
  intro: Card
  author: string
  icons: string[]
  tags: RecipeTags
}

export interface HeaderID extends Header, ID{}

function RecipeDescriptionInit(): RecipeDescription{
  return {author: '', icons: [], intro: CardInitializer(), tags: RecipeTagsInit()}
}

export interface Recipe extends ID{
  description: RecipeDescription
  ingredients: HeaderID[]
  steps: HeaderID[]
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

export interface SQLITERecipe extends ID {
  title: string; // intro.header
  text: string; // intro.header
  image_alt: string; //intro.image
  image_src: string; // intro.image
  author: string;
  stars: number;
  votes: number;
}

export function RecipeToSQLITE(recipe: Recipe): SQLITERecipe {
  return {
    id: recipe.id,
    title: recipe.description.intro.header.title,
    text: recipe.description.intro.header.text,
    image_alt: recipe.description.intro.image.alt,
    image_src: recipe.description.intro.image.src,
    author: recipe.description.author,
    stars: recipe.stars,
    votes: recipe.votes,
  }
}

export function SQLITEToRecipe(sqliteRecipe: SQLITERecipe): Recipe {
  return {
    id: sqliteRecipe.id,
    description: {
      author: sqliteRecipe.author,
      intro: {
        header: {
          title: sqliteRecipe.title,
          text: sqliteRecipe.text
        },
        image: {
          alt: sqliteRecipe.image_alt,
          src: sqliteRecipe.image_src
        },
      },
      icons: [],
      tags: RecipeTagsInit()
    },
    ingredients: [],
    steps: [],
    stars: sqliteRecipe.stars,
    votes: sqliteRecipe.votes,
  }
}
