import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {JsonMyRecipesDescriptionService} from '@services/instances/loading/my/recipes/json.my.recipes.description.service';
import {MyRecipesDescriptionService} from '@services/interfaces/loading/my/recipes/my.recipes.description.service';
import {Subscription} from 'rxjs';
import {Recipe} from '@models/my/my.recipes';
import {RecipeDescriptionComponent} from '@components/my/recipes/recipe.description/recipe.description.component';
import {FirestoreService} from '@services/firebase/firestore.service';
import {NoRecipes} from '@services/error.codes';
import {DatabaseAPI} from '@services/firebase/databaseAPI';

@Component({
  selector: 'my-recipes',
  imports: [
    RecipeDescriptionComponent
  ],
  templateUrl: './my.recipes.component.html',
  styleUrl: './my.recipes.component.css'
})

export class MyRecipesComponent implements OnInit, OnDestroy {
  service: MyRecipesDescriptionService = inject(JsonMyRecipesDescriptionService)
  sub: Subscription = new Subscription();
  recipes: Recipe[] = []
  recipe!: Recipe;
  index : number = 0;

  recipesIdLoader: DatabaseAPI = inject(FirestoreService)
  idSignals = signal<string[]>([])
  currentIndex = signal<number>(0)
  current = computed(() => {
    let ids = this.idSignals()
    let current = this.currentIndex()
    if (ids.length >= 0) {
      return ids[current]
    } else {
      return NoRecipes
    }
  })


  constructor() {}

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  ngOnInit(): void {
    this.sub = this.recipesIdLoader.getIDs("users", "KjRmbKn1gvb567YaTDptzGY0AlH3", "recipes").subscribe( ids => {
      this.idSignals.set(ids)
    })
  }

  next(){
    this.currentIndex.update(index => (index + 1) % this.idSignals().length)
  }

  previous(){
    this.currentIndex.update(index => (index - 1 + this.idSignals().length) % this.idSignals().length)
  }

}
