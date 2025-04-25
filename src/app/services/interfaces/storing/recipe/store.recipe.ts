import {Recipe} from '@models/my/my.recipes';

export interface StoreRecipe {
  store(recipe: Recipe): Promise<string> // return recipe generated id
}
