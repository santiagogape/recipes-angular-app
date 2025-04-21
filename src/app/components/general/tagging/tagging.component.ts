import {Component, Input} from '@angular/core';
import {RecipeTags} from '../../../models/my/my.recipes';

@Component({
  selector: 'tagging',
  imports: [],
  templateUrl: './tagging.component.html',
  styleUrl: './tagging.component.css'
})
export class TaggingComponent {
  @Input() tags!: RecipeTags
  constructor() {}
}
