import { Component } from '@angular/core';
import { AboutUsSponsorsComponent } from '../../components-about/about.us.sponsors/about.us.sponsors.component';
import {AboutUsWelcomeComponent} from '../../components-about/about.us.welcome/about.us.welcome.component';
import {AboutUsStatsComponent} from '../../components-about/about.us.stats/about.us.stats.component';
import {AboutUsMarketingComponent} from '../../components-about/about.us.marketing/about.us.marketing.component';
import {AboutUsTeamComponent} from '../../components-about/about.us.team/about.us.team.component';

@Component({
  selector: 'app-about-us',
  imports: [
    AboutUsSponsorsComponent,
    AboutUsWelcomeComponent,
    AboutUsStatsComponent,
    AboutUsMarketingComponent,
    AboutUsTeamComponent
  ],
  templateUrl: './about.us.component.html',
  styleUrl: './about.us.component.css'
})
export class AboutUsComponent {
  welcome: string = 'assets/about/about.us.welcome.json';
  stats: string = "assets/about/about.us.stats.json";
  sponsors: string = "assets/about/about.us.sponsors.json";
  marketing: string = "assets/about/about.us.marketing.json";
  team: string = "assets/about/about.us.team.json";

}
