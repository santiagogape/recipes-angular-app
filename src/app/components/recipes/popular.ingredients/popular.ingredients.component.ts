import {Component, effect, inject, input, OnDestroy, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {FirestoreService} from '@services/firebase/firestore.service';
import {RecipesIngredients} from '@models/recipes/recipes.ingredients';
import {HeaderInitializer} from '@models/general/header';

@Component({
  selector: 'popular-ingredients',
  imports: [],
  templateUrl: './popular.ingredients.component.html',
  styleUrl: './popular.ingredients.component.css'
})
export class PopularIngredientsComponent implements  OnDestroy {
  sub: Subscription = new Subscription();

  src = input.required<string>()
  root = input.required<string>()
  path = input.required<string[]>()
  db = inject(FirestoreService)
  section = signal<RecipesIngredients>({header:HeaderInitializer(), cards:[]})

  constructor() {
    effect(() => {
      effect(() => {
        if (!(this.src() && this.root() && this.path())) return
        this.sub = this.db.readDocument<RecipesIngredients>(this.src(), this.root(), ...this.path())
          .subscribe((section) => this.section.set(section))
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
