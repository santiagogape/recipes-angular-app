import {Component, computed, effect, inject, OnDestroy, signal} from '@angular/core';
import {JsonMyRecipesDescriptionService} from '@services/instances/loading/my/recipes/json.my.recipes.description.service';
import {MyRecipesDescriptionService} from '@services/interfaces/loading/my/recipes/my.recipes.description.service';
import {Subscription} from 'rxjs';
import {Recipe} from '@models/my/my.recipes';
import {RecipeDescriptionComponent} from '@components/my/recipes/recipe.description/recipe.description.component';
import {FirestoreService} from '@services/firebase/firestore.service';
import {NoLogin, NoRecipes} from '@services/error.codes';
import {DatabaseAPI} from '@services/firebase/databaseAPI';
import {AuthService} from '@services/firebase/auth.service';
import {RouterLink} from '@angular/router';
import {RecipeCreatingComponent} from '@components/my/recipes/recipe.crud/recipe-creating.component';
import {StorageService} from '@services/firebase/storage.service';

@Component({
  selector: 'my-recipes',
  imports: [
    RecipeDescriptionComponent,
    RouterLink,
    RecipeCreatingComponent
  ],
  templateUrl: './my.recipes.component.html',
  styleUrl: './my.recipes.component.css'
})

export class MyRecipesComponent implements  OnDestroy {

  private storageService =  inject(StorageService);
  firestoreService = inject(FirestoreService)
  creating = signal<boolean>(false)

  async store($event: { recipe: Recipe; image: File; }) {
    let id = await this.firestoreService.createDocument($event.recipe, "users", this.auth.currentUserID(), "recipes");
    alert('Receta guardada con éxito');
    $event.recipe.description.intro.image.src = await this.storageService.uploadFile($event.image,
      "users", this.auth.currentUserID(),"recipes", id
    );
    await this.firestoreService.updateDocument(id,$event.recipe, "users", this.auth.currentUserID(), "recipes");
    alert('Receta guardada con éxito');
    this.creating.set(false)
  }

  async delete(){
    await this.storageService.deleteFile("users",this.auth.currentUserID(),"recipes",this.current());
    await this.firestoreService.deleteDocument(this.current(),"users",this.auth.currentUserID(),"recipes");
    this.toTop()
  }

  service: MyRecipesDescriptionService = inject(JsonMyRecipesDescriptionService)
  sub: Subscription = new Subscription();
  auth = inject(AuthService)
  recipes: Recipe[] = []
  recipe!: Recipe;
  index : number = 0;

  recipesIdLoader: DatabaseAPI = inject(FirestoreService)
  idSignals = signal<string[]>([])
  currentIndex = signal<number>(0)
  current = computed(() => {
    let ids = this.idSignals()
    let current = this.currentIndex()
    if (ids.length >= 0) {
      return ids[current]
    } else {
      return NoRecipes
    }
  })
  editing = signal<boolean>(false)


  constructor() {
    effect(()=>{
      console.log(this.auth.currentUserID(),this.current(), this.editing(), this.creating(), this.idSignals())
    })
    effect(() => {
      if (this.auth.currentUserID() && this.auth.currentUserID() !== NoLogin){
        this.sub = this.recipesIdLoader.getIDs("users", this.auth.currentUserID(), "recipes").subscribe( ids => {
          this.idSignals.set(ids)
        })
      } else {
        this.sub.unsubscribe()
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  next(){
    this.currentIndex.update(index => (index + 1) % this.idSignals().length)
  }

  previous(){
    this.currentIndex.update(index => (index - 1 + this.idSignals().length) % this.idSignals().length)
  }

  edit() {
    this.editing.set(true)
    this.toTop()
  }

  toTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  create(){
    this.creating.set(true)
    this.toTop()
  }

  protected readonly NoRecipes = NoRecipes;

  async update(event: { recipe: Recipe; image: File; modifiedImg: boolean;}) {
    if (event.modifiedImg){
      await this.storageService.deleteFile("users",this.auth.currentUserID(),"recipes", this.current())
      await this.storageService.uploadFile(event.image, "users",this.auth.currentUserID(),"recipes", this.current())
    }
    await this.firestoreService.updateDocument(this.current(), event.recipe, "users", this.auth.currentUserID(), "recipes")
    alert('Receta guardada con éxito');
    this.creating.set(false)
  }
}
