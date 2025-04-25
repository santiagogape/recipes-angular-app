import {inject, Injectable} from '@angular/core';
import {AboutUsSponsorsService} from '@services/interfaces/loading/about-us/about.us.sponsors.service';
import {Observable} from 'rxjs';
import {AboutUsSponsors} from '@models/about/about.us.sponsors';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class JsonAboutUsSponsorsService implements AboutUsSponsorsService {
  http: HttpClient = inject(HttpClient)
  getSponsorsFrom(src: string): Observable<AboutUsSponsors> {
    return this.http.get<AboutUsSponsors>(src).pipe();
  }
}
