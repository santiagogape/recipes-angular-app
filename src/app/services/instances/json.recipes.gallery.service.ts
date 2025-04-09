import {RecipesGalleryService} from '../interfaces/recipes.gallery.service';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipesGallery } from '../../models/recipes/recipes.gallery';


@Injectable({providedIn: 'root'})

export class JsonRecipesGalleryService implements RecipesGalleryService {
  http: HttpClient = inject(HttpClient)

  constructor() {
  }
  getGallery(src: string): Observable<RecipesGallery> {
        return this.http.get<RecipesGallery>(src).pipe();
    }
}
