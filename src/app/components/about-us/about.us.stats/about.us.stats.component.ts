import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AboutUsStatsService} from '../../../services/interfaces/page/about-us/about.us.stats.service';
import {JsonAboutUsStatsService} from '../../../services/instances/page/about-us/json.about.us.stats.service';
import {AboutUsStats} from '../../../models/about/about.us.stats';
import {Subscription} from 'rxjs';
import {CardInitializer} from '../../../models/general/card';

@Component({
  selector: 'about-us-stats',
  imports: [],
  templateUrl: './about.us.stats.component.html',
  styleUrl: './about.us.stats.component.css'
})
export class AboutUsStatsComponent implements OnInit, OnDestroy {
  @Input() src: string = ""
  service: AboutUsStatsService = inject(JsonAboutUsStatsService)
  stats: AboutUsStats = {intro:CardInitializer(),stats:[],description:""}
  sub: Subscription = new Subscription()
  constructor() {}

  ngOnDestroy(): void {
        this.sub.unsubscribe()
  }

  ngOnInit(): void {
        if (this.src){
          this.sub = this.service.getStats(this.src).subscribe(
            data => {
              this.stats = data;
            }
          )
        }
  }

}
