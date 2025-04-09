import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {JsonMyRecipesDescriptionService} from '../../services/instances/json.my.recipes.description.service';
import {MyRecipesDescriptionService} from '../../services/interfaces/my.recipes.description.service';
import {Subscription} from 'rxjs';
import {Recipe} from '../../models/my/myRecipes';
import {RecipeDescriptionComponent} from '../../components.my/recipe-description/recipe-description.component';

@Component({
  selector: 'app-my',
  imports: [
    RecipeDescriptionComponent
  ],
  templateUrl: './my.component.html',
  styleUrl: './my.component.css'
})
export class MyComponent implements OnInit, OnDestroy {
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
