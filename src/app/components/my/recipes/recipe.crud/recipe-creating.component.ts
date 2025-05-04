import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FirestoreService} from '@services/firebase/firestore.service';
import {Recipe, RecipeInitializer, RecipeTags} from '@models/my/my.recipes';
import {AuthService} from '@services/firebase/auth.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {Header} from '@models/general/header';
import {ImageSrc} from '@models/general/ImageSrc';
import {NgForOf} from '@angular/common';
import {NoRecipes} from '@services/error.codes';

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
  selector: 'app-recipe-creating',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './recipe-creating.component.html',
  styleUrl: './recipe-creating.component.css'
})
export class RecipeCreatingComponent {
  firestoreService = inject(FirestoreService)
  id = input.required<string>()
  recipe = signal<Recipe>(RecipeInitializer());
  image = signal("")
  auth = inject(AuthService)
  builder = inject(FormBuilder)
  imageFile: File | null = null;
  iconsDefault = ["link","twitter","linkedin","facebook"]
  form = this.builder.group<RecipeForm>({
    description: this.builder.group({
      intro: this.builder.group({
        header: this.createHeader(),
      }),
      tags: this.builder.group<TagsForm>({
        categories: this.builder.array([this.createDefaultControl()]),
        allergens: this.builder.array([this.createDefaultControl()])
      })
    }),
    ingredients: this.builder.array<FormGroup<HeaderForm>>([this.createHeader()]),
    steps: this.builder.array([this.createHeader()])
  });

  newRecipe = output<{recipe:Recipe,image:File}>();
  newRecipeModified = output<{recipe:Recipe,image:File, modifiedImg:boolean}>();
  onStored = input.required<boolean>()

  changedImaged = signal(false)

  constructor() {
    effect(() => {
      if (this.id() !== NoRecipes) {
        this.firestoreService
          .readDocument<Recipe>(this.id(), "users", this.auth.currentUserID(), "recipes")
          .subscribe((r) => {
            this.recipe.set(r)
            this.image.set(r.description.intro.image.src)
            this.form.patchValue({
              description: {
                intro: {
                  header: this.recipe().description.intro.header
                },
                tags: r.description.tags
              },
              steps: r.steps,
              ingredients: r.ingredients
            })
          })
      }
    })
    effect(() => {
      if (this.onStored()) this.form.reset()
    });
  }


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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.imageFile = input.files[0];
    }
    this.changedImaged.set(true)
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      const recipeData: Recipe = this.recipeFromForm();

      // 1. Subir imagen si existe
      if (!this.imageFile) {
        alert('Añade una imagen a tu receta!');
      } else if (!(this.id() !== NoRecipes)) {
        this.newRecipe.emit({recipe: recipeData, image: this.imageFile})
      } else {
        this.newRecipeModified.emit({
          recipe: recipeData,
          image: this.imageFile,
          modifiedImg: this.changedImaged()
        })
      }
    } catch (error) {
      console.error('Error al guardar la receta:', error);
    }
  }

  private recipeFromForm(): Recipe {
    let src = this.recipe() ? this.recipe().description.intro.image.src : "";
    return {
      stars: 0,
      votes: 0,
      steps: this.steps.value as Header[],
      ingredients: this.ingredients.value as Header[],
      description: {
        intro: {
          header: this.header.value as Header,
          image: {alt:(this.header.value as Header).title, src: src } as ImageSrc
        },
        tags: {...this.tags.value} as RecipeTags,
        author: this.auth.currentUserID(),
        icons: this.iconsDefault
      }
    }
  }
}
