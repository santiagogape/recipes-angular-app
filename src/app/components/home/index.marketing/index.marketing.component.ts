import {Component, effect, inject, input, OnDestroy, signal} from '@angular/core';
import {HomeMarketingSection, IndexMarketing} from '@models/home/index.marketing';
import {Subscription} from 'rxjs';
import {FirestoreService} from '@services/firebase/firestore.service';

@Component({
  selector: 'index-marketing',
  imports: [],
  templateUrl: './index.marketing.component.html',
  styleUrl: './index.marketing.component.css'
})
export class IndexMarketingComponent implements OnDestroy {
  db = inject(FirestoreService)
  section = signal<HomeMarketingSection>({sections:[]});
  root = input.required<string>()
  path = input.required<string[]>()
  src = input.required<string>()
  protected sub: Subscription = new Subscription();
  constructor() {
    effect(() => {
      if (!(this.src() && this.root() && this.path())) return
      this.sub = this.db.readDocument<HomeMarketingSection>(this.src(), this.root(), ...this.path())
        .subscribe((marketing) => this.section.set(marketing))
    });
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
