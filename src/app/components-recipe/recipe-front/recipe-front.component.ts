import {Component, Input} from '@angular/core';
import {RecipeDescription} from '../../models/my/myRecipes';
import {TaggingComponent} from '../../components-general/tagging/tagging.component';

@Component({
  selector: 'app-recipe-front',
  imports: [
    TaggingComponent
  ],
  templateUrl: './recipe-front.component.html',
  styleUrl: './recipe-front.component.css'
})
export class RecipeFrontComponent {
  @Input() description!: RecipeDescription;
  constructor() {}
}
