import {Observable} from 'rxjs';
import {MyRecipes} from '../../../../../models/my/my.recipes';

export interface MyRecipesDescriptionService {
  getMyRecipesDescriptions(src:string): Observable<MyRecipes>
}
