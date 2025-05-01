import {
  Component,
  effect,
  inject,
  input,
  OnDestroy,
  signal,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {CarouselInitializer, CarouselTwoRows} from '@models/general/carousel';
import {combineLatest, Subscription} from 'rxjs';
import {DatabaseAPI} from '@services/firebase/databaseAPI';
import {FirestoreService} from '@services/firebase/firestore.service';
import {Header, HeaderInitializer} from '@models/general/header';
import {
  AuthorRecipe,
  AuthorRecipeData
} from '@models/general/AuthorRecipePair';
import {
  collection,
  doc,
  docData,
  DocumentReference,
  Firestore,
  onSnapshot,
  query,
  Unsubscribe,
  where
} from '@angular/fire/firestore';
import { Recipe } from '@models/my/my.recipes';
import {User} from '@models/my/user';
import {RouterLink} from '@angular/router';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'carousel',
  imports: [
    RouterLink,
    NgTemplateOutlet
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  standalone: true
})
export class CarouselComponent implements OnDestroy {
  /**
   * route(id: string | undefined, id1: string | undefined): string | any[] | _i1.UrlTree | null | undefined {
   *       throw new Error('Method not implemented.');
   *   }
   */
  service:DatabaseAPI = inject(FirestoreService)
  header = signal<Header>(HeaderInitializer())
  normal = signal<AuthorRecipeData[]>([])
  reverse = signal<AuthorRecipeData[]>([])
  firestore = inject(Firestore)


  protected carousel: CarouselTwoRows = CarouselInitializer();
  protected subCarousel: Subscription = new Subscription();
  protected subNormal: Unsubscribe = () => {};
  subNormalObs: Subscription[] = []
  subReverseObs: Subscription[] = []
  protected subReverse: Unsubscribe = () => {};


  @ViewChild('recipeImage', { static: true }) recipeImageTemplate!: TemplateRef<RecipeImageContext>;

  constructor() {
    effect(() => {
      this.root()
      this.path()
      this.src()
      this.srcCollection()
      this.subscribe()
    });
  }

  root = input.required<string>()
  path = input.required<string[]>()
  src = input.required<string>()
  srcCollection = input.required<string>()

  subscribe() {
    const normalQuery = query(collection(this.firestore, this.root(), ...this.path(), this.src(), this.srcCollection()),
      where('direction', '==', "normal"));
    const reverseQuery = query(collection(this.firestore, this.root(), ...this.path(), this.src(), this.srcCollection()),
      where('direction', '==', "reverse"));
    this.subCarousel = this.service.readDocument<CarouselTwoRows>(this.src(),this.root(),...this.path()).subscribe(
      data => this.header.set(data.header)
    )

    this.subNormal = onSnapshot(normalQuery, (querySnapshot) => {
      this.subNormalObs.forEach(sub => sub.unsubscribe())
      this.subNormalObs = []
      querySnapshot.forEach((document) => {
        let pair = { id: document.id, ...document.data() } as AuthorRecipe;
        let author = doc(this.firestore, "users", pair.author) as DocumentReference<User>;
        let recipe = doc(this.firestore, "users", pair.author, "recipes", pair.recipe) as DocumentReference<Recipe>;

        this.subNormalObs.push(
          combineLatest([docData(author, { idField: 'id' }), docData(recipe, { idField: 'id' })]).subscribe(
            ([author, recipe]) => {
              if (author && recipe) {
                this.normal.update(arr => [...arr,
                  {authorData: author, recipeData: recipe, id: pair.id} as AuthorRecipeData])
              }
            }
          )
        )
      });
    });


    this.subReverse = onSnapshot(reverseQuery, (querySnapshot) => {
      this.subReverseObs.forEach(sub => sub.unsubscribe())
      this.subReverseObs = []
      querySnapshot.forEach((document) => {
        let pair = { id: document.id, ...document.data() } as AuthorRecipe;
        let author = doc(this.firestore, "users", pair.author) as DocumentReference<User>;
        let recipe = doc(this.firestore, "users", pair.author, "recipes", pair.recipe) as DocumentReference<Recipe>;

        this.subReverseObs.push(
          combineLatest([docData(author, { idField: 'id' }), docData(recipe, { idField: 'id' })]).subscribe(
            ([author, recipe]) => {
              if (author && recipe) {
                this.reverse.update(arr => [...arr,
                  {authorData: author, recipeData: recipe, id: pair.id} as AuthorRecipeData])
              }
            }
          )
        )

      });

    });
  }

  ngOnDestroy() {
    this.subNormalObs.forEach(sub => sub.unsubscribe())
    this.subReverseObs.forEach(sub => sub.unsubscribe())
    this.subCarousel.unsubscribe()
    this.subNormal()
    this.subReverse()
  }

  duplicate(arr: AuthorRecipeData[]) {
    return [...arr, ...arr]
  }
}

interface RecipeImageContext {
  $implicit: AuthorRecipeData;
}
