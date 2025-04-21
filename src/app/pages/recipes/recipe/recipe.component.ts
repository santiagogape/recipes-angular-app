import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RecipeFrontComponent} from '../../../components/recipes/page/recipe.front/recipe.front.component';
import {Subscription} from 'rxjs';
import {Recipe} from '../../../models/my/my.recipes';
import {RecipeService} from '../../../services/interfaces/page/recipes/recipe/recipe.service';
import {JsonRecipeService} from '../../../services/instances/page/recipes/page/json.recipe.service';
import {RecipeStepsComponent} from '../../../components/recipes/page/recipe.steps/recipe.steps.component';
import {CarouselComponent} from '../../../components/general/carousel/carousel.component';

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
export class RecipeComponent implements OnInit, OnDestroy {
  mine: string = 'assets/recipe/recipe.json'
  carousel: string = 'assets/general/carousel.json'
  service: RecipeService = inject(JsonRecipeService)
  sub: Subscription = new Subscription();
  recipe!: Recipe;

  constructor() {}

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  ngOnInit(): void {
    this.sub = this.service.getRecipe(this.mine).subscribe(
      recipe => {
        this.recipe = recipe
      }
    )
  }
}
