import {HomeMarketingService} from '../../../interfaces/page/home/home.marketing.service';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IndexMarketing} from '../../../../models/home/index.marketing';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class JsonHomeMarketingService implements HomeMarketingService {

  private http: HttpClient = inject(HttpClient)
  getMarketingSections(src: string): Observable<IndexMarketing[]> {
    return this.http.get<IndexMarketing[]>(src).pipe()
  }
}
