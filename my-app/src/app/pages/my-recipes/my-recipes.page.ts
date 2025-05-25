import {Component, computed, effect, inject, signal} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg, IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {add, heart, star, starOutline, trash, pencil} from 'ionicons/icons';

import {StorageService} from "@services/firebase/storage.service";
import {FirestoreService} from "@services/firebase/firestore.service";
import {NoLogin, NoRecipes} from '@services/error.codes';
import {Subscription} from "rxjs";
import {AuthService} from "@services/firebase/auth.service";
import {Recipe, RecipeInitializer} from "@models/my/my.recipes";
import {TaggingComponent} from "./tagging/tagging.component"
import {ImageDropzoneComponent} from "@pages/image-dropzone/image-dropzone.component";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {Header} from "@models/general/header";
import {ImageSrc} from "@models/general/ImageSrc";
import {RecipeTags} from "@models/my/my.recipes";
import {NgForOf} from "@angular/common";

export interface HeaderForm {
  title: FormControl<string>;
  text: FormControl<string>;
}

export interface TagsForm {
  categories: FormArray<FormControl<string>>
  allergens:  FormArray<FormControl<string>>
}

interface IntroForm {
  header: FormGroup<HeaderForm>;
}

interface DescriptionForm {
  intro: FormGroup<IntroForm>;
  tags: FormGroup<TagsForm>;
}

interface RecipeForm {
  description: FormGroup<DescriptionForm>;
  ingredients: FormArray<FormGroup<HeaderForm>>;
  steps: FormArray<FormGroup<HeaderForm>>;
}



@Component({
  selector: 'app-my-recipes',
  templateUrl: 'my-recipes.page.html',
  styleUrls: ['my-recipes.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonList, IonIcon, IonFab, IonFabButton, IonModal, IonButton, IonButtons, TaggingComponent, IonListHeader, IonLabel, IonImg, ImageDropzoneComponent, FormsModule, NgForOf, ReactiveFormsModule, IonInput],
})
export class MyRecipesPage {

  private storageService =  inject(StorageService);
  firestoreService = inject(FirestoreService)
  auth = inject(AuthService)

  sub: Subscription = new Subscription();
  recipes = signal<Recipe[]>([])
  viewing = computed(() => this.recipes().length > 0)

  constructor() {
    addIcons({ heart, trash, add, star, starOutline, pencil });

    effect(() => {
      if (this.auth.currentUserID() && this.auth.currentUserID() !== NoLogin){
        this.sub = this.firestoreService.getCollection<Recipe>("users", this.auth.currentUserID(), "recipes").subscribe(
          (recipes) => {
            this.recipes.set(recipes)
          }
        )
      } else {
        this.sub.unsubscribe()
      }
    });
  }






  modalRecipe = signal<Recipe>(RecipeInitializer())
  isModalOpen = false;
  setOpen(isOpen: boolean, id: string  = '') {
    this.isModalOpen = isOpen;
    if (isOpen && id !== '') {
      this.modalRecipe.set(this.recipes().find(r => r.id === id) || RecipeInitializer())
    }
  }



  isFavorite = signal(false);
  toggleFavorite(recipe: string) {
    if (this.isFavorite()) this.removeFromFavorites(recipe);
    else this.addToFavorites(recipe);
    this.isFavorite.set(!this.isFavorite());
  }

  addToFavorites(recipe: string) {
    console.log('Añadido a favoritos');
    // Tu lógica para añadir
  }

  removeFromFavorites(recipe: string) {
    console.log('Eliminado de favoritos');
    // Tu lógica para eliminar
  }


  //crud modal

  CreateUpdate = false
  isNew = signal(true)
  editing = signal<Recipe>(RecipeInitializer())
  openCreateRecipeModal() {
    this.CreateUpdate = true
    this.isNew.set(true)
  }
  closeCreateUpdateModal() {
    this.CreateUpdate = false
    this.form.reset()
  }
  openEditRecipeModal(recipe: Recipe) {
    this.CreateUpdate = true
    this.isNew.set(false)
    this.editing.set(recipe)

    this.loadRecipe(this.editing())
  }


  //create
  async createRecipe(data :{recipe: Recipe, image: File}) {
    let id = await this.firestoreService.createDocument<Recipe>(data.recipe, "users", this.auth.currentUserID(), "recipes")
    data.recipe.description.intro.image.src = await this.storageService.uploadFile(data.image, "users",this.auth.currentUserID(), id)
    data.recipe.id = id
    await this.firestoreService.updateDocument<Recipe>(id,data.recipe, "users", this.auth.currentUserID(), "recipes")
  }

  //update
  async updateRecipe(data :{recipe: Recipe, image: File}) {
    if (data.recipe.id) {
      await this.storageService.deleteFile("users", this.auth.currentUserID(), data.recipe.id)
      data.recipe.description.intro.image.src = await this.storageService.uploadFile(data.image, "users", this.auth.currentUserID(), data.recipe.id)
      await this.firestoreService.updateDocument(data.recipe.id, data.recipe, "users", this.auth.currentUserID(), "recipes")
    }
  }

  //delete
  async deleteRecipe(id: string) {
    await this.storageService.deleteFile("users",id)
    await this.firestoreService.deleteDocument("users", this.auth.currentUserID(), "recipes", id)
  }






  /// form
  builder = inject(FormBuilder)
  iconsDefault = ["link","twitter","linkedin","facebook"]
  image= signal<File>(new File([], ''))
  newImage(image: File) {
    this.image.set(image)
  }
  form = this.builder.group<RecipeForm>({
    description: this.builder.group({
      intro: this.builder.group({
        header: this.createHeader()
      }),
      tags: this.builder.group<TagsForm>({
        categories: this.builder.array([this.createDefaultControl()]),
        allergens: this.builder.array([this.createDefaultControl()])
      })
    }),
    ingredients: this.builder.array<FormGroup<HeaderForm>>([this.createHeader()]),
    steps: this.builder.array([this.createHeader()])
  });

  get ingredients() {
    return this.form.get('ingredients') as FormArray<FormGroup<HeaderForm>>;
  }

  get steps() {
    return this.form.get('steps') as FormArray<FormGroup<HeaderForm>>;
  }

  get header() {
    return this.form.get('description.intro.header') as  FormGroup<HeaderForm>;
  }
  get tags(){
    return this.form.get('description.tags') as FormGroup<TagsForm>;
  }
  get categories(){
    return this.form.get('description.tags.categories') as FormArray<FormControl<string>>;
  }
  get allergens(){
    return this.form.get('description.tags.allergens') as FormArray<FormControl<string>>;
  }

  createHeader(): FormGroup<HeaderForm>
  {
    return this.builder.group({
      title: this.createDefaultControl(),
      text: this.createDefaultControl()
    });
  }

  addControl(array: FormArray, creator: FormGroup | FormControl = this.createDefaultControl()) {
    array.push(creator);
  }

  createDefaultControl(): FormControl<string>{
    return this.builder.control('', { nonNullable: true, validators: Validators.required })
  }

  removeControl(array: FormArray, index: number) {
    array.removeAt(index);
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else if (!this.image() || this.image().size === 0) {
      alert('Añade una imagen a tu receta!');
      return;
    }
    try {
      let edited: Recipe = this.recipeFromForm();
      if (this.isNew()) {
        await this.createRecipe({recipe: edited, image: this.image()})
      } else {
        edited.id = this.editing().id
        await this.updateRecipe({recipe: edited, image: this.image()})
      }
      this.closeCreateUpdateModal()
    } catch (error) {
      console.error('Error al guardar la receta:', error);
    }
  }

  private recipeFromForm(): Recipe {
    return {
      stars: 0,
      votes: 0,
      steps: this.steps.value as Header[],
      ingredients: this.ingredients.value as Header[],
      description: {
        intro: {
          header: this.header.value as Header,
          image: {alt:(this.header.value as Header).title, src: "" } as ImageSrc
        },
        tags: {...this.tags.value} as RecipeTags,
        author: this.auth.currentUserID(),
        icons: this.iconsDefault
      }
    }
  }

  //para editar
  loadRecipe(recipe: Recipe) {
    // Header
    this.header.patchValue(recipe.description.intro.header);

    // Tags
    this.clearFormArray(this.categories);
    recipe.description.tags.categories.forEach(tag =>
      this.categories.push(this.builder.control(tag, { nonNullable: true, validators: Validators.required }))
    );

    this.clearFormArray(this.allergens);
    recipe.description.tags.allergens.forEach(tag =>
      this.allergens.push(this.builder.control(tag, { nonNullable: true, validators: Validators.required }))
    );

    // Ingredients
    this.clearFormArray(this.ingredients);
    recipe.ingredients.forEach(ingredient => {
      this.ingredients.push(this.builder.group({
        title: this.builder.control(ingredient.title, { nonNullable: true, validators: Validators.required }),
        text: this.builder.control(ingredient.text, { nonNullable: true, validators: Validators.required })
      }));
    });

    // Steps
    this.clearFormArray(this.steps);
    recipe.steps.forEach(step => {
      this.steps.push(this.builder.group({
        title: this.builder.control(step.title, { nonNullable: true, validators: Validators.required }),
        text: this.builder.control(step.text, { nonNullable: true, validators: Validators.required })
      }));
    });
  }

  clearFormArray(array: FormArray<any>) {
    while (array.length) {
      array.removeAt(0);
    }
  }

}
