import {Component, input} from '@angular/core';
import {RecipeTags} from '@models/my/my.recipes';
import {IonChip, IonCol, IonGrid, IonLabel, IonRow} from "@ionic/angular/standalone";

@Component({
  selector: 'tagging',
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonChip
  ],
  templateUrl: './tagging.component.html',
  styleUrl: './tagging.component.css'
})
export class TaggingComponent {
  tags = input.required<RecipeTags>()
  constructor() {}
}
