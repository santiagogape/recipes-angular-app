import {Component, effect, inject, input, OnDestroy, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import { CardInitializer} from '@models/general/card';
import {RecipesWelcomeBrowser} from '@models/recipes/recipes.welcome.browser';
import {FirestoreService} from '@services/firebase/firestore.service';

@Component({
  selector: 'recipes-welcome-browser',
  imports: [],
  templateUrl: './recipes.welcome.browser.component.html',
  styleUrl: './recipes.welcome.browser.component.css'
})
export class RecipesWelcomeBrowserComponent implements OnDestroy {
  sub: Subscription = new Subscription()
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  src = input.required<string>()
  root = input.required<string>()
  path = input.required<string[]>()
  db = inject(FirestoreService)
  section = signal<RecipesWelcomeBrowser>({intro:CardInitializer()})

  constructor() {
    effect(() => {
      effect(() => {
        if (!(this.src() && this.root() && this.path())) return
        this.sub = this.db.readDocument<RecipesWelcomeBrowser>(this.src(), this.root(), ...this.path())
          .subscribe((welcome) => this.section.set(welcome))
      });
    });
  }
}
