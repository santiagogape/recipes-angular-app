import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonHeader, IonImg, IonInput, IonLabel, IonTitle, IonToolbar} from '@ionic/angular/standalone';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.page.html',
  styleUrls: ['./create-recipe.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonInput, IonImg]
})
export class CreateRecipePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
