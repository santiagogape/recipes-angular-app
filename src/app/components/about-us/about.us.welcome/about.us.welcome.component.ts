import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AboutUsWelcomeService} from '../../../services/interfaces/loading/about-us/about.us.welcome.service';
import {JsonAboutUsWelcomeService} from '../../../services/instances/loading/about-us/json.about.us.welcome.service';
import {AboutUsWelcome} from '../../../models/about/about.us.welcome';
import {CardInitializer} from '../../../models/general/card';

@Component({
  selector: 'about-us-welcome',
  imports: [],
  templateUrl: './about.us.welcome.component.html',
  styleUrl: './about.us.welcome.component.css'
})
export class AboutUsWelcomeComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  ngOnInit(): void {
    if (this.src){
      this.service.welcome(this.src).subscribe(
        data => {
          this.welcome = data
        }
      )
    }
  }

  @Input() src:string = ""
  service: AboutUsWelcomeService = inject(JsonAboutUsWelcomeService)
  welcome: AboutUsWelcome = {intro:CardInitializer()}
  sub: Subscription = new Subscription;
}
