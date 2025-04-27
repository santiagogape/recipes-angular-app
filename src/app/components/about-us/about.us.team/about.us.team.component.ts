import {Component, effect, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {AboutUsTeam} from '@models/about/about.us.team';
import {Subscription} from 'rxjs';
import {HeaderInitializer} from '@models/general/header';
import {DatabaseAPI} from '@services/firebase/databaseAPI';
import {FirestoreService} from '@services/firebase/firestore.service';

@Component({
  selector: 'about-us-team',
  imports: [],
  templateUrl: './about.us.team.component.html',
  styleUrl: './about.us.team.component.css'
})
export class AboutUsTeamComponent implements OnInit, OnDestroy {
  service: DatabaseAPI = inject(FirestoreService)
  sub: Subscription = new Subscription()
  constructor() {}

  team = signal<AboutUsTeam>({header:HeaderInitializer(),description:"",members:[]})
  src = input.required<string>()
  root = input.required<string>()
  path = input.required<string[]>()

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

  subscribe(){
    this.sub = this.service.readDocument<AboutUsTeam>(this.src(),this.root(),...this.path())
      .subscribe(data => this.team.set(data))
  }

}
