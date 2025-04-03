import {Component, inject, Input, OnInit} from '@angular/core';
import {JsonIndexMarketingService} from '../../services/instances/JsonIndexMarketingService';
import {Marketing} from '../../models/interfaces/index-marketing';

@Component({
  selector: 'index-marketing',
  imports: [],
  templateUrl: './index-marketing.component.html',
  styleUrl: './index-marketing.component.css'
})
export class IndexMarketingComponent implements OnInit {
  private service = inject(JsonIndexMarketingService)
  @Input() marketing: string = "";
  protected sections: Marketing[] = [];
  constructor() {}

  ngOnInit() {
    if (this.marketing) {
      this.service.getMarketingSections(this.marketing).then((marketing) => {
        this.sections = marketing;
        console.log("sections" + this.sections)
      });
    }
  }

  direction(section: Marketing) {
    if (section.side === "right") {
      return 'index-marketing-container grid-columns-auto-300 section-max-width'
    } else {
      return 'index-marketing-container-reverse grid-columns-auto-300 section-max-width'
    }
  }
}
