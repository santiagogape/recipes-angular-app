import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {RecipesGalleryService} from '@services/interfaces/loading/recipes/recipes.gallery.service';
import {JsonRecipesGalleryService} from '@services/instances/loading/recipes/json.recipes.gallery.service';
import {Subscription} from 'rxjs';
import {RecipesGallery} from '@models/recipes/recipes.gallery';
import {HeaderInitializer} from '@models/general/header';

@Component({
  selector: 'recipes-gallery',
  imports: [],
  templateUrl: './recipes.gallery.component.html',
  styleUrl: './recipes.gallery.component.css'
})
export class RecipesGalleryComponent implements OnInit, OnDestroy {
  @Input() src: string = ""
  service: RecipesGalleryService = inject(JsonRecipesGalleryService)
  sub: Subscription = new Subscription();
  protected gallery: RecipesGallery = {header:HeaderInitializer(), last:[], first:[],middle:[]};
  constructor() {}

  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }

  ngOnInit(): void {
    if (this.src) {
      this.sub = this.service.getGallery(this.src).subscribe(
        gallery => this.gallery = gallery
      )
    }
  }


}
