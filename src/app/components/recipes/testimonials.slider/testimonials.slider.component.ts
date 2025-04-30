import {Component, effect, inject, input, signal} from '@angular/core';
import {combineLatest, Subscription, switchMap, tap } from 'rxjs';
import {DatabaseAPI} from '@services/firebase/databaseAPI';
import {FirestoreService} from '@services/firebase/firestore.service';
import { TestimonialsSlider} from '@models/general/slider';
import {RecipesTestimonialData} from '@models/recipes/recipes.testimonial';
import {Slider} from '@components/general/slider/slider.component';

@Component({
  selector: 'app-testimonials-slider',
  imports: [],
  templateUrl: './testimonials.slider.component.html',
  styleUrl: './testimonials.slider.component.css'
})
export class TestimonialsSliderComponent extends Slider{
  testimonials = signal<RecipesTestimonialData[]>([])
  sub: Subscription = new Subscription();
  src = input.required<string>()
  root = input.required<string>()
  path = input.required<string[]>()
  service: DatabaseAPI = inject(FirestoreService)
  title = signal("")

  constructor() {
    super();
    effect(() => {
      this.src()
      this.root()
      this.path()
      this.subscribeTestimonials();
    })
    effect(() => {
      console.log(this.testimonials())
    });
  }


  subscribeTestimonials(){
    this.sub = this.service.readDocument<TestimonialsSlider>(this.src(), this.root(), ...this.path()).pipe(
      tap((data)=> console.log("data",data)),
      tap(data => this.title.set(data.title)),
      switchMap(data => {
        const observables = data.testimonials.map(this.service.getTestimonialDataFromID);
        return combineLatest([...observables]); // Observable<RecipesTestimonialData[]>
      }),
    ).subscribe({
      next: (arr) => this.update(arr),
      error: (err) => console.error("Error in pipeline:", err)
    });
  }

  stars(valuation: number) {
    return Array(valuation).fill(0).map((_, i) => i)
  }

  private update(arr: RecipesTestimonialData[]) {
    this.testimonials.set([...arr])
    this.initSwiper()
  }
}
