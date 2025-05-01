import {Component, effect, inject, input, OnDestroy, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {RecipeGalleryInitializer, RecipesGallery} from '@models/recipes/recipes.gallery';
import {FirestoreService} from '@services/firebase/firestore.service';

@Component({
  selector: 'recipes-gallery',
  imports: [],
  templateUrl: './recipes.gallery.component.html',
  styleUrl: './recipes.gallery.component.css'
})
export class RecipesGalleryComponent implements OnDestroy {
  sub: Subscription = new Subscription();

  src = input.required<string>()
  root = input.required<string>()
  path = input.required<string[]>()
  db = inject(FirestoreService)
  section = signal<RecipesGallery>(RecipeGalleryInitializer())

  constructor() {
    effect(() => {
      effect(() => {
        if (!(this.src() && this.root() && this.path())) return
        this.sub = this.db.readDocument<RecipesGallery>(this.src(), this.root(), ...this.path())
          .subscribe((welcome) => this.section.set(welcome))
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }


}
