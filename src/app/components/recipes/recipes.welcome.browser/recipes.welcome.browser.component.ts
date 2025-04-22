import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {JsonRecipesWelcomeBrowserService} from '../../../services/instances/loading/recipes/json.recipes.welcome.browser.service';
import {RecipesWelcomeBrowserService} from '../../../services/interfaces/loading/recipes/recipes.welcome.browser.service';
import {Subscription} from 'rxjs';
import { CardInitializer} from '../../../models/general/card';
import {RecipesWelcomeBrowser} from '../../../models/recipes/recipes.welcome.browser';

@Component({
  selector: 'recipes-welcome-browser',
  imports: [],
  templateUrl: './recipes.welcome.browser.component.html',
  styleUrl: './recipes.welcome.browser.component.css'
})
export class RecipesWelcomeBrowserComponent implements OnInit, OnDestroy {
  @Input() src: string = ""
  service: RecipesWelcomeBrowserService = inject(JsonRecipesWelcomeBrowserService)
  browser: RecipesWelcomeBrowser = {intro:CardInitializer()}
  sub: Subscription = new Subscription()
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  ngOnInit(): void {
    if (this.src) {
      this.sub = this.service.getBrowser(this.src).subscribe(
        browser => this.browser = browser
      )
    }
  }

}
