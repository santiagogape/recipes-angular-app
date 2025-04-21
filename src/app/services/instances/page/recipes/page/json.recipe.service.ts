import { Observable } from 'rxjs';
import { Recipe } from '../../../../../models/my/my.recipes';
import {RecipeService} from '../../../../interfaces/page/recipes/recipe/recipe.service';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class JsonRecipeService implements RecipeService {
  http: HttpClient = inject(HttpClient)
    getRecipe(src: string): Observable<Recipe> {
        return this.http.get<Recipe>(src)
    }
}
