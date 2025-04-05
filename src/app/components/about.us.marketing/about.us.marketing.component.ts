import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {JsonAboutUsMarketingService} from '../../services/instances/json.about.us.marketing.service';
import {AboutUsMarketingService} from '../../services/interfaces/about.us.marketing.service';
import {AboutUsMarketing} from '../../models/interfaces/about.us.marketing';

@Component({
  selector: 'app-about-us-marketing',
  imports: [],
  templateUrl: './about.us.marketing.component.html',
  styleUrl: './about.us.marketing.component.css'
})
export class AboutUsMarketingComponent implements OnInit, OnDestroy {
  @Input() src: string= ""
  sub: Subscription = new Subscription();
  service: AboutUsMarketingService = inject(JsonAboutUsMarketingService)
  marketing: AboutUsMarketing = {header:{title:"",subtitle:""},features:[],description:""}
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
