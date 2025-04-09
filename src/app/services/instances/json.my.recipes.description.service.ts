import {inject, Injectable} from '@angular/core';
import {MyRecipesDescriptionService} from '../interfaces/my.recipes.description.service';
import { Observable } from 'rxjs';
import { MyRecipesDescriptions } from '../../models/my/my.recipes.descriptions';
import {HttpClient} from '@angular/common/http';


@Injectable({providedIn: 'root'})

export class JsonMyRecipesDescriptionService implements MyRecipesDescriptionService {
  private http: HttpClient = inject(HttpClient);
  getMyRecipesDescriptions(src: string): Observable<MyRecipesDescriptions> {
      return this.http.get<MyRecipesDescriptions>(src).pipe()
  }
}
