import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AboutUsTeam} from '@models/about/about.us.team';
import {JsonAboutUsTeamService} from '@services/instances/loading/about-us/json.about.us.team.service';
import {AboutUsTeamService} from '@services/interfaces/loading/about-us/about.us.team.service';
import {Subscription} from 'rxjs';
import {HeaderInitializer} from '@models/general/header';

@Component({
  selector: 'about-us-team',
  imports: [],
  templateUrl: './about.us.team.component.html',
  styleUrl: './about.us.team.component.css'
})
export class AboutUsTeamComponent implements OnInit, OnDestroy {
  @Input() src: string = "";
  team: AboutUsTeam = {header:HeaderInitializer(),description:"",members:[]};
  service: AboutUsTeamService = inject(JsonAboutUsTeamService)
  sub: Subscription = new Subscription()
  constructor() {}

  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }

  ngOnInit(): void {
      if (this.src) {
        this.sub = this.service.getTeam(this.src).subscribe(team => { this.team = team })
      }
  }

}
