import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {JsonAboutUsMarketingService} from '@services/instances/loading/about-us/json.about.us.marketing.service';
import {AboutUsMarketingService} from '@services/interfaces/loading/about-us/about.us.marketing.service';
import {AboutUsMarketing} from '@models/about/about.us.marketing';
import {HeaderInitializer} from '@models/general/header';

@Component({
  selector: 'about-us-marketing',
  imports: [],
  templateUrl: './about.us.marketing.component.html',
  styleUrl: './about.us.marketing.component.css'
})
export class AboutUsMarketingComponent implements OnInit, OnDestroy {
  @Input() src: string= ""
  sub: Subscription = new Subscription();
  service: AboutUsMarketingService = inject(JsonAboutUsMarketingService)
  marketing: AboutUsMarketing = {header:HeaderInitializer(),features:[],description:""}
  constructor() {}

  ngOnInit(): void {
    if (this.src) {
      this.sub = this.service.getOurMarketing(this.src).subscribe(
        data => this.marketing = data
      )
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
