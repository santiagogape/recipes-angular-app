import {Component, Input} from '@angular/core';
import {StarRatingComponent} from '../../components-general/star-rating/star-rating.component';
import {Header} from '../../models/general/header';

@Component({
  selector: 'app-recipe-steps',
  imports: [
    StarRatingComponent
  ],
  templateUrl: './recipe-steps.component.html',
  styleUrl: './recipe-steps.component.css'
})
export class RecipeStepsComponent {
  @Input() ingredients: Header[] = [];
  @Input() steps: Header[] = [];
  @Input() title: string = '';
  constructor() {}
}
