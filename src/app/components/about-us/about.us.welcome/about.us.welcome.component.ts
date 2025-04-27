import {Component, effect, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {AboutUsWelcome} from '@models/about/about.us.welcome';
import {CardInitializer} from '@models/general/card';
import {DatabaseAPI} from '@services/firebase/databaseAPI';
import {FirestoreService} from '@services/firebase/firestore.service';



@Component({
  selector: 'about-us-welcome',
  imports: [],
  templateUrl: './about.us.welcome.component.html',
  styleUrl: './about.us.welcome.component.css'
})
export class AboutUsWelcomeComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  ngOnInit(): void {
    effect(() => {
      this.src()
      this.root()
      this.path()
      this.subscribe()
    })
  }

  root = input.required<string>();
  path = input.required<string[]>();
  src = input.required<string>();
  welcome = signal<AboutUsWelcome>({intro:CardInitializer()})

  service: DatabaseAPI = inject(FirestoreService)
  sub: Subscription = new Subscription();

  subscribe() {
    this.service.readDocument<AboutUsWelcome>(this.src(),this.root(),...this.path()).subscribe(
      data => {
        this.welcome.set(data)
      }
    )
  }
}
