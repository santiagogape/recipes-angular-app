import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AboutUsWelcomeService} from '../../services/interfaces/about.us.welcome.service';
import {JsonAboutUsWelcomeService} from '../../services/instances/json.about.us.welcome.service';
import {AboutUsWelcome} from '../../models/interfaces/about.us.welcome';

@Component({
  selector: 'app-about-welcome',
  imports: [],
  templateUrl: './about-welcome.component.html',
  styleUrl: './about-welcome.component.css'
})
export class AboutWelcomeComponent implements OnInit, OnDestroy {
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
  welcome: AboutUsWelcome = {title:"", subtitle:"", image:{alt:"",src:""}}
  sub: Subscription = new Subscription;
}
