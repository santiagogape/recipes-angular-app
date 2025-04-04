import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Sponsors} from '../../models/interfaces/sponsors';

@Component({
  selector: 'app-sponsors',
  imports: [],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.css'
})
export class SponsorsComponent implements OnInit, OnDestroy{
  @Input() src: string = "";
  sub: Subscription = new Subscription();
  sponsors: Sponsors = {title:"",sponsors:[]}
  constructor() {}


  ngOnDestroy(): void {

  }

  ngOnInit(): void {

  }


}
