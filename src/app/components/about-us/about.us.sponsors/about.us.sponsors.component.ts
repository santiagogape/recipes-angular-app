import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AboutUsSponsors} from '@models/about/about.us.sponsors';
import {AboutUsSponsorsService} from '@services/interfaces/loading/about-us/about.us.sponsors.service';
import {JsonAboutUsSponsorsService} from '@services/instances/loading/about-us/json.about.us.sponsors.service';

@Component({
  selector: 'about-us-sponsors',
  imports: [],
  templateUrl: './about.us.sponsors.component.html',
  styleUrl: './about.us.sponsors.component.css'
})
export class AboutUsSponsorsComponent implements OnInit, OnDestroy{
  @Input() src: string = "";
  sub: Subscription = new Subscription();
  sponsors: AboutUsSponsors = {title:"",sponsors:[]}
  service: AboutUsSponsorsService = inject(JsonAboutUsSponsorsService);
  constructor() {}


  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  ngOnInit(): void {
    if (this.src){
      this.sub = this.service.getSponsorsFrom(this.src).subscribe( sponsors => {
        this.sponsors = sponsors;
      })
    }
  }


}
