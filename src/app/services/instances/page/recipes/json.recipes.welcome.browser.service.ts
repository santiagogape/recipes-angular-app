import {inject, Injectable} from '@angular/core';
import {RecipesWelcomeBrowserService} from '../../../interfaces/page/recipes/recipes.welcome.browser.service';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RecipesWelcomeBrowser} from '../../../../models/recipes/recipes.welcome.browser';

@Injectable({providedIn: "root"})

export class JsonRecipesWelcomeBrowserService implements RecipesWelcomeBrowserService {
  http: HttpClient = inject(HttpClient)

  getBrowser(src: string): Observable<RecipesWelcomeBrowser> {
        return this.http.get<RecipesWelcomeBrowser>(src).pipe()
    }
}
