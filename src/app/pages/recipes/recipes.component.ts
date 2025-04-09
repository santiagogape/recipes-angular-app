import { Component } from '@angular/core';
import {RecipesWelcomeBrowserComponent} from '../../components-recipes/recipes.welcome.browser/recipes.welcome.browser.component';
import {PopularIngredientsComponent} from '../../components-recipes/popular-ingredients/popular-ingredients.component';
import {RecipesGalleryComponent} from '../../components-recipes/recipes-gallery/recipes-gallery.component';
import {SliderComponent} from '../../components-general/slider/slider.component';

@Component({
  selector: 'app-recipes',
  imports: [
    RecipesWelcomeBrowserComponent,
    RecipesWelcomeBrowserComponent,
    PopularIngredientsComponent,
    RecipesGalleryComponent,
    SliderComponent
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  protected browser = "assets/recipes/recipes.welcome.browser.json"
  protected ingredients = "assets/recipes/recipes.ingredients.json"
  protected gallery = "assets/recipes/recipes.gallery.json"
  protected slider = "assets/recipes/recipes.testimonials.slider.json"
  protected slider_type = "testimonials"
}
