import {Observable} from 'rxjs';
import {AboutUsStats} from '../../models/about/about.us.stats';

export interface StatsService {
  getStats(src: string): Observable<AboutUsStats>
}
