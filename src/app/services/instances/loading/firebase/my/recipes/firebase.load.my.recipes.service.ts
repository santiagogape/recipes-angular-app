import { Recipe } from '@models/my/my.recipes';
import {MyRecipesDescriptionService} from '@services/interfaces/loading/my/recipes/my.recipes.description.service';
import {Observable} from 'rxjs';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {inject} from '@angular/core';

export class FirebaseLoadMyRecipesService implements MyRecipesDescriptionService {
  firestore = inject(Firestore)
    getMyRecipesDescriptions(src: string): Observable<Recipe[]> {
      return collectionData(
        collection(this.firestore,
          'users',
          'KjRmbKn1gvb567YaTDptzGY0AlH3',
          'recipes'),
        {idField: 'id'}) as Observable<Recipe[]>;
    }
}
