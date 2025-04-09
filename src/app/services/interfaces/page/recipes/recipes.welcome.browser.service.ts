import {Observable} from 'rxjs';
import {RecipesWelcomeBrowser} from '../../../../models/recipes/recipes.welcome.browser';

export interface RecipesWelcomeBrowserService {
  getBrowser(src: string): Observable<RecipesWelcomeBrowser>
}
