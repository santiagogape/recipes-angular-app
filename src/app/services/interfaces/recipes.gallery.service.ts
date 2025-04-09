import {Observable} from 'rxjs';
import {RecipesGallery} from '../../models/recipes/recipes.gallery';

export interface RecipesGalleryService {
  getGallery(src:string): Observable<RecipesGallery>
}
