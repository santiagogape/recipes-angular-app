import {RecipesIngredientsService} from '../interfaces/recipes.ingredients.service';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RecipesIngredients} from '../../models/recipes/recipes.ingredients';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class JsonRecipesIngredientsService implements RecipesIngredientsService {
  http: HttpClient = inject(HttpClient)
  getIngredients(src: string): Observable<RecipesIngredients> {
    return this.http.get<RecipesIngredients>(src).pipe();
  }
}
