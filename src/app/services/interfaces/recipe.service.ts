import {Recipe} from '../../models/my/myRecipes';
import {Observable} from 'rxjs';

export interface RecipeService {
  getRecipe(src: string): Observable<Recipe>;
}
