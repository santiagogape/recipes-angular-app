import { Injectable} from '@angular/core';
import {SponsorsService} from '../interfaces/sponsors.service';
import {Observable} from 'rxjs';
import {AboutUsSponsors} from '../../models/interfaces/about.us.sponsors';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class JsonAboutUsSponsorsService implements SponsorsService {
  http: HttpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
  getSponsorsFrom(src: string): Observable<AboutUsSponsors> {
    return this.http.get<AboutUsSponsors>(src).pipe();
  }
}
