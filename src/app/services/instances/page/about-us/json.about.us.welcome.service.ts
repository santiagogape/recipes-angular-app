import {inject, Injectable} from '@angular/core';
import {AboutUsWelcomeService} from '../../../interfaces/page/about-us/about.us.welcome.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AboutUsWelcome} from '../../../../models/about/about.us.welcome';

@Injectable({ providedIn: 'root' })

export class JsonAboutUsWelcomeService implements AboutUsWelcomeService {
  http: HttpClient = inject(HttpClient)
  welcome(src:string): Observable<AboutUsWelcome> {
    return this.http.get<AboutUsWelcome>(src).pipe();
  }
}
