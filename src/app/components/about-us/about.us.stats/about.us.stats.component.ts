import {Component, effect, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {AboutUsStats} from '@models/about/about.us.stats';
import {Subscription} from 'rxjs';
import {CardInitializer} from '@models/general/card';
import {DatabaseAPI} from '@services/firebase/databaseAPI';
import {FirestoreService} from '@services/firebase/firestore.service';

@Component({
  selector: 'about-us-stats',
  imports: [],
  templateUrl: './about.us.stats.component.html',
  styleUrl: './about.us.stats.component.css'
})
export class AboutUsStatsComponent implements OnInit, OnDestroy {
  service: DatabaseAPI = inject(FirestoreService)
  sub: Subscription = new Subscription()

  stats = signal<AboutUsStats>({intro:CardInitializer(),stats:[],description:""})
  src = input.required<string>()
  root = input.required<string>()
  path = input.required<string[]>()

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

  subscribe() {
    this.sub = this.service.readDocument<AboutUsStats>(this.src(), this.root(), ...this.path()).subscribe(
      data => {
        this.stats.set(data);
      }
    )
  }

}
