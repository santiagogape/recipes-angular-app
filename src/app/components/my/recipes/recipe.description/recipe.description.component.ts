import {Component, input, output, computed, inject, signal, effect} from '@angular/core';
import {FirestoreService} from '@services/firebase/firestore.service';
import {Recipe, RecipeInitializer} from '@models/my/my.recipes';
import {NoRecipes} from '@services/error.codes';
import {TaggingComponent} from '@components/general/tagging/tagging.component';
import {AuthService} from '@services/firebase/auth.service';

@Component({
  selector: 'recipe-description',
  imports: [
    TaggingComponent
  ],
  templateUrl: './recipe.description.component.html',
  styleUrl: './recipe.description.component.css'
})
export class RecipeDescriptionComponent {
  firestoreService = inject(FirestoreService)
  id = input.required<string>()
  recipe = signal<Recipe>(RecipeInitializer());
  fillContent = computed(() => this.id() !== NoRecipes)
  auth = inject(AuthService)

  next =  output<MouseEvent>();
  prev =  output<MouseEvent>();

  constructor() {
    effect(() => {
      if (this.id() === NoRecipes) return;
      this.updateRecipe()
    })
  }

  updateRecipe() {
    this.firestoreService.readDocument<Recipe>(this.id(),"users", this.auth.currentUserID(), "recipes")
      .subscribe(res => { this.recipe.set(res)})
  }

  nextRecipe(event: MouseEvent) {
    this.next.emit(event)
  }
  previousRecipe(event: MouseEvent) {
    this.prev.emit(event)
  }
}
