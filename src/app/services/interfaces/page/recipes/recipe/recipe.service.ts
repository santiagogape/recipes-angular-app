import {Recipe} from '../../../../../models/my/my.recipes';
import {Observable} from 'rxjs';

export interface RecipeService {
  getRecipe(src: string): Observable<Recipe>;
}
