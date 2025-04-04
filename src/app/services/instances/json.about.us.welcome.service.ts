import { Injectable} from '@angular/core';
import {AboutUsWelcomeService} from '../interfaces/about.us.welcome.service';
import {AboutUsWelcome} from '../../models/interfaces/about.us.welcome';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })

export class JsonAboutUsWelcomeService implements AboutUsWelcomeService {
  http: HttpClient = new HttpClient(new HttpXhrBackend({build: () => new XMLHttpRequest()}));
  welcome(src:string): Observable<AboutUsWelcome> {
    return this.http.get<AboutUsWelcome>(src).pipe();
  }
}
