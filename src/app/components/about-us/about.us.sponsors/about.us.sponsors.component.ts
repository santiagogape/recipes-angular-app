import {Component, effect, inject, input, OnDestroy, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {AboutUsSponsors} from '@models/about/about.us.sponsors';
import {DatabaseAPI} from '@services/firebase/databaseAPI';
import {FirestoreService} from '@services/firebase/firestore.service';

@Component({
  selector: 'about-us-sponsors',
  imports: [],
  templateUrl: './about.us.sponsors.component.html',
  styleUrl: './about.us.sponsors.component.css'
})
export class AboutUsSponsorsComponent implements  OnDestroy{
  sub: Subscription = new Subscription();
  service: DatabaseAPI = inject(FirestoreService);
  constructor() {
    effect(() => {
      this.src()
      this.root()
      this.path()
      this.subscribe()
    })
  }

  sponsors = signal<AboutUsSponsors>({title:"",sponsors:[]})
  src = input.required<string>()
  root = input.required<string>()
  path = input.required<string[]>()

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  subscribe() {
    this.sub = this.service.readDocument<AboutUsSponsors>(this.src(), this.root(), ...this.path()).subscribe(
      data => {
        this.sponsors.set(data);
      }
    )
  }


}
