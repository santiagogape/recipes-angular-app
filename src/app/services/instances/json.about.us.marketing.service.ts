import {Injectable} from '@angular/core';
import {AboutUsMarketingService} from '../interfaces/about.us.marketing.service';
import {Observable} from 'rxjs';
import {AboutUsMarketing} from '../../models/interfaces/about.us.marketing';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class JsonAboutUsMarketingService implements AboutUsMarketingService {
  http: HttpClient = new HttpClient(new HttpXhrBackend({build: () => new XMLHttpRequest()}));
  getOurMarketing(src: string): Observable<AboutUsMarketing> {
    return this.http.get<AboutUsMarketing>(src).pipe();
  }

}
