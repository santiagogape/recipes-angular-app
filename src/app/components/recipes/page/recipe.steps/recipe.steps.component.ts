import {Component, input, output} from '@angular/core';
import {StarRatingComponent} from '@components/general/star.rating/star-rating.component';
import {Header} from '@models/general/header';

@Component({
  selector: 'recipe-steps',
  imports: [
    StarRatingComponent
  ],
  templateUrl: './recipe.steps.component.html',
  styleUrl: './recipe.steps.component.css'
})
export class RecipeStepsComponent {
  ingredients = input.required<Header[]>()
  steps = input.required<Header[]>()
  title = "Follow this easy instructions:"
  valuation = output<number>()
  constructor() {}

  valuate(event: number){
    this.valuation.emit(event)
  }
}
