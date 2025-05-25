import {User, UserInitializer} from '@models/my/user';
import {Recipe, RecipeInitializer} from '@models/my/my.recipes';
import { ID } from '@services/firebase/databaseAPI';

export interface AuthorRecipe extends ID {
  author: string;
  recipe: string;
}

export function AuthorRecipeInitializer(): AuthorRecipe{
  return new class implements AuthorRecipe {
    author: string = "";
    recipe: string = "";
  }
}

export interface AuthorRecipeData extends ID {
  authorData: User;
  recipeData: Recipe;
}

export function AuthorRecipeDataInitializer(): AuthorRecipeData{
  return new class implements AuthorRecipeData {
    authorData =  UserInitializer();
    recipeData = RecipeInitializer();
  }
}
