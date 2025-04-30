import {Component, computed, effect, inject, Input, OnInit, signal} from '@angular/core';
import {GallerySlider} from '@models/general/slider';
import {combineLatest, Subscription, switchMap, tap} from 'rxjs';
import {AuthorRecipeData} from '@models/general/AuthorRecipePair';
import {DatabaseAPI} from '@services/firebase/databaseAPI';
import {FirestoreService} from '@services/firebase/firestore.service';
import { Slider } from '@components/general/slider/slider.component';

@Component({
  selector: 'app-image-slider',
  imports: [],
  templateUrl: './image.slider.component.html',
  styleUrl: './image.slider.component.css'
})
export class ImageSliderComponent extends Slider implements OnInit {
  gallery = signal<AuthorRecipeData[]>([])
  recipes = computed(() => this.gallery().map(p => p.recipeData))
  sub: Subscription = new Subscription();

  service: DatabaseAPI = inject(FirestoreService)
  @Input() src: string = ""
  @Input() root: string = ""
  @Input() path: string[] = []
  title = signal("")

  constructor() {
    super();
    effect(() => {
      console.log(this.recipes())
    });
  }

  ngOnInit(){
    this.sub = this.service.readDocument<GallerySlider>(this.src, this.root, ...this.path).pipe(
      tap(data => this.title.set(data.title)),
      switchMap(data => {
        const observables = data.recipes.map(r => this.service.getAuthorRecipeDataFromID(r));
        return combineLatest([...observables]); // Observable<AuthorRecipeData[]>
      }),
    ).subscribe({
      next: (arr) => this.update(arr),
      error: (err) => console.error("Error in pipeline:", err)
    });
  }

  update(arr: AuthorRecipeData[]): void {
    this.gallery.set([...arr])
    this.initSwiper()
  }
}
