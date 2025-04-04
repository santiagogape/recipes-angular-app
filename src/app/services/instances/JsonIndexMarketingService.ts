import {IndexMarketingService} from '../interfaces/index-marketing-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Marketing} from '../../models/interfaces/index-marketing';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class JsonIndexMarketingService implements IndexMarketingService {

  private http: HttpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
  getMarketingSections(src: string): Observable<Marketing[]> {
    return this.http.get<Marketing[]>(src).pipe()
  }
}
