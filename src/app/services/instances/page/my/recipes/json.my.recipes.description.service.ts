import {inject, Injectable} from '@angular/core';
import {MyRecipesDescriptionService} from '../../../../interfaces/page/my/recipes/my.recipes.description.service';
import { Observable } from 'rxjs';
import { MyRecipes } from '../../../../../models/my/myRecipes';
import {HttpClient} from '@angular/common/http';


@Injectable({providedIn: 'root'})

export class JsonMyRecipesDescriptionService implements MyRecipesDescriptionService {
  private http: HttpClient = inject(HttpClient);
  getMyRecipesDescriptions(src: string): Observable<MyRecipes> {
      return this.http.get<MyRecipes>(src).pipe()
  }
}
