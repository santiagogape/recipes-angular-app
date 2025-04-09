import {Observable} from 'rxjs';
import {MyRecipesDescriptions} from '../../models/my/my.recipes.descriptions';

export interface MyRecipesDescriptionService {
  getMyRecipesDescriptions(src:string): Observable<MyRecipesDescriptions>
}
