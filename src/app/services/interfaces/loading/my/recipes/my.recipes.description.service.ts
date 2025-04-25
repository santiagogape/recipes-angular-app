import {Observable} from 'rxjs';
import { Recipe} from '@models/my/my.recipes';

export interface MyRecipesDescriptionService {
  getMyRecipesDescriptions(src:string): Observable<Recipe[]>
}
