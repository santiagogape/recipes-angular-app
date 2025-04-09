import {Component, Input} from '@angular/core';
import {RecipeTags} from '../../models/my/myRecipes';

@Component({
  selector: 'app-tagging',
  imports: [],
  templateUrl: './tagging.component.html',
  styleUrl: './tagging.component.css'
})
export class TaggingComponent {
  @Input() tags!: RecipeTags
  constructor() {}
}
