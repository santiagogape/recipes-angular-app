import {inject, Injectable} from '@angular/core';
import {MyRecipesDescriptionService} from '@services/interfaces/loading/my/recipes/my.recipes.description.service';
import { Observable } from 'rxjs';
import {Recipe} from '@models/my/my.recipes';
import {HttpClient} from '@angular/common/http';


@Injectable({providedIn: 'root'})

export class JsonMyRecipesDescriptionService implements MyRecipesDescriptionService {
  private http: HttpClient = inject(HttpClient);
  getMyRecipesDescriptions(src: string): Observable<Recipe[]> {
      return this.http.get<Recipe[]>(src).pipe()
  }
}
