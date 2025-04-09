import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecipeDescription} from '../../models/my/my.recipes.descriptions';
import {of} from 'rxjs';

@Component({
  selector: 'app-recipe-description',
  imports: [],
  templateUrl: './recipe-description.component.html',
  styleUrl: './recipe-description.component.css'
})
export class RecipeDescriptionComponent {
  @Input() recipe!: RecipeDescription;
  @Output() change: EventEmitter<string> = new EventEmitter();
  constructor() {
    of(this.recipe).subscribe(
      recipe => {
      console.log("one:",recipe);
      }
    )
  }
  next() {
    console.log("next from",this.recipe)
    this.change.emit("next")
  }
  previous() {
    console.log("previos from",this.recipe)
    this.change.emit("previous")
  }
}
