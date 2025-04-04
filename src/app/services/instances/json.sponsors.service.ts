import { Injectable} from '@angular/core';
import {SponsorsService} from '../interfaces/sponsors.service';
import {Observable} from 'rxjs';
import {Sponsors} from '../../models/interfaces/sponsors';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class JsonSponsorsService implements SponsorsService {
  http: HttpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
  getSponsorsFrom(src: string): Observable<Sponsors> {
    return this.http.get<Sponsors>(src).pipe();
  }
}
