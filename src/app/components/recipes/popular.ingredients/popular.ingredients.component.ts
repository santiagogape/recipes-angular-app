import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {RecipesIngredientsService} from '@services/interfaces/loading/recipes/recipes.ingredients.service';
import {JsonRecipesIngredientsService} from '@services/instances/loading/recipes/json.recipes.ingredients.service';
import {RecipesIngredients} from '@models/recipes/recipes.ingredients';
import {HeaderInitializer} from '@models/general/header';

@Component({
  selector: 'popular-ingredients',
  imports: [],
  templateUrl: './popular.ingredients.component.html',
  styleUrl: './popular.ingredients.component.css'
})
export class PopularIngredientsComponent implements OnInit , OnDestroy {
  @Input() src: string = ""
  sub: Subscription = new Subscription();
  service: RecipesIngredientsService = inject(JsonRecipesIngredientsService)
  protected ingredients: RecipesIngredients = {header:HeaderInitializer(),cards:[]};
  constructor() {}

  ngOnDestroy(): void {
        this.sub.unsubscribe()
    }

  ngOnInit(): void {
        if (this.src) {
          this.sub = this.service.getIngredients(this.src).subscribe(
            ingredients => this.ingredients = ingredients
          )
        }
    }

}
