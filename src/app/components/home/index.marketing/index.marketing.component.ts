import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {JsonHomeMarketingService} from '../../../services/instances/page/home/json.home.marketing.service';
import {IndexMarketing} from '../../../models/home/index.marketing';
import {HomeMarketingService} from '../../../services/interfaces/page/home/home.marketing.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'index-marketing',
  imports: [],
  templateUrl: './index.marketing.component.html',
  styleUrl: './index.marketing.component.css'
})
export class IndexMarketingComponent implements OnInit, OnDestroy {
  private service: HomeMarketingService = inject(JsonHomeMarketingService)
  @Input() marketing: string = "";
  protected sections: IndexMarketing[] = [];
  protected sub: Subscription = new Subscription();
  constructor() {}

  ngOnInit() {
    if (this.marketing) {
      this.sub = this.service.getMarketingSections(this.marketing).subscribe(
        sections => this.sections = sections
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  direction(section: IndexMarketing) {
    if (section.reverse) {
      return 'index-marketing-container-reverse grid-columns-auto-300 section-max-width'
    } else {
      return 'index-marketing-container grid-columns-auto-300 section-max-width'
    }
  }
}
