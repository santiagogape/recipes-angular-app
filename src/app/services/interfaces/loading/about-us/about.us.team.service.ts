import {Observable} from 'rxjs';
import {AboutUsTeam} from '@models/about/about.us.team';

export interface AboutUsTeamService {
  getTeam(src: string): Observable<AboutUsTeam>;
}
