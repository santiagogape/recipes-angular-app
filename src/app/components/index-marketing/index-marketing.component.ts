import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {JsonIndexMarketingService} from '../../services/instances/JsonIndexMarketingService';
import {Marketing} from '../../models/interfaces/index-marketing';
import {IndexMarketingService} from '../../services/interfaces/index-marketing-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'index-marketing',
  imports: [],
  templateUrl: './index-marketing.component.html',
  styleUrl: './index-marketing.component.css'
})
export class IndexMarketingComponent implements OnInit, OnDestroy {
  private service: IndexMarketingService = inject(JsonIndexMarketingService)
  @Input() marketing: string = "";
  protected sections: Marketing[] = [];
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

  direction(section: Marketing) {
    if (section.reverse) {
      return 'index-marketing-container-reverse grid-columns-auto-300 section-max-width'
    } else {
      return 'index-marketing-container grid-columns-auto-300 section-max-width'
    }
  }
}
