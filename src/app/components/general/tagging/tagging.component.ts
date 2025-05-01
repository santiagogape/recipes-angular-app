import {Component, input} from '@angular/core';
import {RecipeTags} from '@models/my/my.recipes';

@Component({
  selector: 'tagging',
  imports: [],
  templateUrl: './tagging.component.html',
  styleUrl: './tagging.component.css'
})
export class TaggingComponent {
  tags = input.required<RecipeTags>()
  constructor() {}
}
