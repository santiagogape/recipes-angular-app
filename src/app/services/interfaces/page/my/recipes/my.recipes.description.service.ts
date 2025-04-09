import {Observable} from 'rxjs';
import {MyRecipes} from '../../../../../models/my/myRecipes';

export interface MyRecipesDescriptionService {
  getMyRecipesDescriptions(src:string): Observable<MyRecipes>
}
