import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AboutUsTeam} from '../../models/interfaces/about.us.team';
import {JsonAboutUsTeamService} from '../../services/instances/json.about.us.team.service';
import {AboutUsTeamService} from '../../services/interfaces/about.us.team.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-about-us-team',
  imports: [],
  templateUrl: './about.us.team.component.html',
  styleUrl: './about.us.team.component.css'
})
export class AboutUsTeamComponent implements OnInit, OnDestroy {
  @Input() src: string = "";
  team: AboutUsTeam = {header:{title:"",subtitle:""},description:"",members:[]};
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
