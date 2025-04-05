import {Injectable} from '@angular/core';
import {StatsService} from '../interfaces/stats.service';
import { Observable } from 'rxjs';
import { AboutUsStats } from '../../models/interfaces/about.us.stats';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class JsonAboutUsStatsService implements StatsService {
    http: HttpClient = new HttpClient(new HttpXhrBackend({build: () => new XMLHttpRequest() }));
    getStats(src: string): Observable<AboutUsStats> {
        return this.http.get<AboutUsStats>(src).pipe();
    }

}
