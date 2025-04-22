import {inject, Injectable} from '@angular/core';
import {AboutUsStatsService} from '../../../interfaces/loading/about-us/about.us.stats.service';
import { Observable } from 'rxjs';
import { AboutUsStats } from '../../../../models/about/about.us.stats';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class JsonAboutUsStatsService implements AboutUsStatsService {
    http: HttpClient = inject(HttpClient)
    getStats(src: string): Observable<AboutUsStats> {
        return this.http.get<AboutUsStats>(src).pipe();
    }

}
