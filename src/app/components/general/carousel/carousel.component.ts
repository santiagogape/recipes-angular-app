import {Component, effect, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
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

@Component({
  selector: 'carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  standalone: true
})
export class CarouselComponent implements OnInit, OnDestroy {
  service:DatabaseAPI = inject(FirestoreService)
  header = signal<Header>(HeaderInitializer())
  normal = signal<AuthorRecipeData[]>([])
  reverse = signal<AuthorRecipeData[]>([])
  firestore = inject(Firestore)



  protected carousel: CarouselTwoRows = CarouselInitializer();
  protected times: Array<number> = [1,2]
  protected subCarousel: Subscription = new Subscription();
  protected subNormal: Unsubscribe = () => {};
  subNormalObs: Subscription[] = []
  subReverseObs: Subscription[] = []
  protected subReverse: Unsubscribe = () => {};

  constructor() {}

  root = input.required<string>()
  path = input.required<string[]>()
  src = input.required<string>()
  srcCollection = input.required<string>()

  ngOnInit() {
    effect(() => {
      this.root()
      this.path()
      this.src()
      this.srcCollection()
      this.subscribe()
    });
  }

  subscribe() {
    const normalQuery = query(collection(this.firestore, this.root(), ...this.path(), this.src(), this.srcCollection()),
      where('direction', '==', "normal"));
    const reverseQuery = query(collection(this.firestore, this.root(), ...this.path(), this.src(), this.srcCollection()),
      where('direction', '==', "normal"));
    this.subCarousel = this.service.readDocument<CarouselTwoRows>(this.src(),this.root(),...this.path()).subscribe(
      data => this.header.set(data.header)
    )

    this.subNormal = onSnapshot(normalQuery, (querySnapshot) => {
      this.subNormalObs.forEach(sub => sub.unsubscribe())
      this.subNormalObs = []

      const updatedRecipesData: AuthorRecipeData[] = [];
      let count = signal(0)
      querySnapshot.forEach((document) => {
        let pair = { id: document.id, ...document.data() } as AuthorRecipe;
        let author = doc(this.firestore, "users", pair.author) as DocumentReference<User>;
        let recipe = doc(this.firestore, "users", pair.author, "recipes", pair.recipe) as DocumentReference<Recipe>;

        this.subNormalObs.push(
          combineLatest([docData(author, { idField: 'id' }), docData(recipe, { idField: 'id' })]).subscribe(
            ([author, recipe]) => {
              if (author && recipe) {
                updatedRecipesData.push({authorData: author, recipeData: recipe, id: pair.id} as AuthorRecipeData)
                count.update(i => i + 1)
              }
            }
          )
        )

      });
      effect(() => {
        if (count() == querySnapshot.docs.length) this.normal.set([...updatedRecipesData])
      });
    });


    this.subReverse = onSnapshot(reverseQuery, (querySnapshot) => {
      this.subReverseObs.forEach(sub => sub.unsubscribe())
      this.subReverseObs = []
      const updatedRecipesData: AuthorRecipeData[] = [];
      let count = signal(0)
      querySnapshot.forEach((document) => {
        let pair = { id: document.id, ...document.data() } as AuthorRecipe;
        let author = doc(this.firestore, "users", pair.author) as DocumentReference<User>;
        let recipe = doc(this.firestore, "users", pair.author, "recipes", pair.recipe) as DocumentReference<Recipe>;

        this.subReverseObs.push(
          combineLatest([docData(author, { idField: 'id' }), docData(recipe, { idField: 'id' })]).subscribe(
            ([author, recipe]) => {
              if (author && recipe) {
                updatedRecipesData.push({authorData: author, recipeData: recipe, id: pair.id} as AuthorRecipeData)
                count.update(i => i + 1)
              }
            }
          )
        )

      });
      effect(() => {
        if (count() == querySnapshot.docs.length) this.reverse.set([...updatedRecipesData])
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
}
