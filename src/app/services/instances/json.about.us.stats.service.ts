import {inject, Injectable} from '@angular/core';
import {StatsService} from '../interfaces/stats.service';
import { Observable } from 'rxjs';
import { AboutUsStats } from '../../models/about/about.us.stats';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class JsonAboutUsStatsService implements StatsService {
    http: HttpClient = inject(HttpClient)
    getStats(src: string): Observable<AboutUsStats> {
        return this.http.get<AboutUsStats>(src).pipe();
    }

}
