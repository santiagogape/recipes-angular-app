import {Component, input} from '@angular/core';
import {RecipeDescription} from '@models/my/my.recipes';
import {TaggingComponent} from '@components/general/tagging/tagging.component';

@Component({
  selector: 'recipe-front',
  imports: [
    TaggingComponent
  ],
  templateUrl: './recipe.front.component.html',
  styleUrl: './recipe.front.component.css'
})
export class RecipeFrontComponent {
  description = input.required<RecipeDescription>();
  constructor() {}
}
