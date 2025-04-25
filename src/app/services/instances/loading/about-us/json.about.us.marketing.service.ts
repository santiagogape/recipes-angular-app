import {inject, Injectable} from '@angular/core';
import {AboutUsMarketingService} from '@services/interfaces/loading/about-us/about.us.marketing.service';
import {Observable} from 'rxjs';
import {AboutUsMarketing} from '@models/about/about.us.marketing';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class JsonAboutUsMarketingService implements AboutUsMarketingService {
  http: HttpClient = inject(HttpClient)
  getOurMarketing(src: string): Observable<AboutUsMarketing> {
    return this.http.get<AboutUsMarketing>(src).pipe();
  }

}
