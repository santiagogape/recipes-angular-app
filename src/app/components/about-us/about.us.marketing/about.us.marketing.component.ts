import {Component, effect, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {AboutUsMarketing} from '@models/about/about.us.marketing';
import {HeaderInitializer} from '@models/general/header';
import {DatabaseAPI} from '@services/firebase/databaseAPI';
import {FirestoreService} from '@services/firebase/firestore.service';

@Component({
  selector: 'about-us-marketing',
  imports: [],
  templateUrl: './about.us.marketing.component.html',
  styleUrl: './about.us.marketing.component.css'
})
export class AboutUsMarketingComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  service: DatabaseAPI = inject(FirestoreService)
  constructor() {}

  marketing = signal<AboutUsMarketing>({header:HeaderInitializer(),features:[],description:""})
  src = input.required<string>()
  root = input.required<string>()
  path = input.required<string[]>()

  ngOnInit(): void {
    effect(() => {
      this.src()
      this.root()
      this.path()
      this.subscribe()
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  subscribe(){
    this.sub = this.service.readDocument<AboutUsMarketing>(this.src(),this.root(),...this.path()).subscribe(
      data => this.marketing.set(data)
    )
  }
}
