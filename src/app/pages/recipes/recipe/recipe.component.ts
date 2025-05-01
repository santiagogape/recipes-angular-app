import {Component, effect, inject, OnDestroy, signal} from '@angular/core';
import {RecipeFrontComponent} from '@components/recipes/page/recipe.front/recipe.front.component';
import {Subscription} from 'rxjs';
import {Recipe, RecipeInitializer} from '@models/my/my.recipes';
import {RecipeStepsComponent} from '@components/recipes/page/recipe.steps/recipe.steps.component';
import {CarouselComponent} from '@components/general/carousel/carousel.component';
import {ActivatedRoute} from '@angular/router';
import {FirestoreService} from '@services/firebase/firestore.service';

@Component({
  selector: 'app-recipe',
  imports: [
    RecipeFrontComponent,
    RecipeStepsComponent,
    CarouselComponent
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnDestroy {
  sub: Subscription = new Subscription();

  params: Subscription = new Subscription();
  recipe = signal<Recipe>(RecipeInitializer())
  private route = inject(ActivatedRoute);

  recipeID = signal<string>("")
  authorID = signal<string>("")
  db = inject(FirestoreService)

  root = "users"
  carrouseRoot = "web"
  path = ["pages","home"]
  carousel: string = 'carousel';
  collection = "recipes"


  constructor() {
    this.params = this.route.queryParams.subscribe(params => {
      this.authorID.set(params['a'] || "");
      this.recipeID.set(params['r'] || "");
    });
    effect(() => {
      this.sub = this.db.readDocument<Recipe>(this.recipeID(), this.root, this.authorID(), this.collection).subscribe(
        recipe => this.recipe.set(recipe)
      )
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.params.unsubscribe()
  }

  protected readonly console = console;
}
