import {Observable} from 'rxjs';
import {AboutUsTeam} from '../../models/interfaces/about.us.team';

export interface AboutUsTeamService {
  getTeam(src: string): Observable<AboutUsTeam>;
}
