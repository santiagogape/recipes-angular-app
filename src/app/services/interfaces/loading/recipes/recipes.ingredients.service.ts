import {Observable} from 'rxjs';
import {RecipesIngredients} from '@models/recipes/recipes.ingredients';

export interface RecipesIngredientsService {
  getIngredients(src: string): Observable<RecipesIngredients>
}
