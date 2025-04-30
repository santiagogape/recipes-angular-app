import { Component } from '@angular/core';
import {RecipesWelcomeBrowserComponent} from '@components/recipes/recipes.welcome.browser/recipes.welcome.browser.component';
import {PopularIngredientsComponent} from '@components/recipes/popular.ingredients/popular.ingredients.component';
import {RecipesGalleryComponent} from '@components/recipes/recipes.gallery/recipes.gallery.component';
import {TestimonialsSliderComponent} from '@components/recipes/testimonials.slider/testimonials.slider.component';

@Component({
  selector: 'recipes',
  imports: [
    RecipesWelcomeBrowserComponent,
    PopularIngredientsComponent,
    RecipesGalleryComponent,
    TestimonialsSliderComponent,
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  protected browser = "assets/recipes/recipes.welcome.browser.json"
  protected ingredients = "assets/recipes/recipes.ingredients.json"
  protected gallery = "assets/recipes/recipes.gallery.json"
  root = "web"
  path = ["pages","recipes"]
  testimonials = "testimonials"
}
