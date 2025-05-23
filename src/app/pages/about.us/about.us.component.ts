import { Component } from '@angular/core';
import { AboutUsSponsorsComponent } from '@components/about-us/about.us.sponsors/about.us.sponsors.component';
import {AboutUsWelcomeComponent} from '@components/about-us/about.us.welcome/about.us.welcome.component';
import {AboutUsStatsComponent} from '@components/about-us/about.us.stats/about.us.stats.component';
import {AboutUsMarketingComponent} from '@components/about-us/about.us.marketing/about.us.marketing.component';
import {AboutUsTeamComponent} from '@components/about-us/about.us.team/about.us.team.component';

@Component({
  selector: 'about-us',
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
  root = "web"
  path = ["pages", "about"]
  welcome = "welcome";
  stats = "stats";
  sponsors = "sponsors";
  marketing = "marketing";
  team = "team";

}
