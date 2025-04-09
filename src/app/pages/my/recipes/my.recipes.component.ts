import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {JsonMyRecipesDescriptionService} from '../../../services/instances/page/my/recipes/json.my.recipes.description.service';
import {MyRecipesDescriptionService} from '../../../services/interfaces/page/my/recipes/my.recipes.description.service';
import {Subscription} from 'rxjs';
import {Recipe} from '../../../models/my/myRecipes';
import {RecipeDescriptionComponent} from '../../../components/my/recipes/recipe.description/recipe.description.component';

@Component({
  selector: 'my-recipes',
  imports: [
    RecipeDescriptionComponent
  ],
  templateUrl: './my.recipes.component.html',
  styleUrl: './my.recipes.component.css'
})
export class MyRecipesComponent implements OnInit, OnDestroy {
  mine: string = 'assets/my/my.recipes.description.json'
  service: MyRecipesDescriptionService = inject(JsonMyRecipesDescriptionService)
  sub: Subscription = new Subscription();
  recipes: Recipe[] = []
  recipe!: Recipe;
  index : number = 0;


  constructor() {}

  ngOnDestroy(): void {
        this.sub.unsubscribe()
    }

  ngOnInit(): void {
    this.sub = this.service.getMyRecipesDescriptions(this.mine).subscribe(
      descriptions => {
        this.recipes = descriptions.recipes
        this.show()
        console.log("modified",this.recipe)
      }
    )
  }

  show(change: string = ''): void {
    if (change === 'next') {
      this.index = (this.index + 1) % this.recipes.length
    } else if (change === 'previous') {
      this.index = (this.index - 1 + this.recipes.length) % this.recipes.length
    }
    console.log(this.index, <Recipe>this.recipes.at(this.index))
    this.recipe =  <Recipe>this.recipes.at(this.index)
  }
}
