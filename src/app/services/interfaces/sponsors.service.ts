import {Sponsors} from '../../models/interfaces/sponsors';
import {Observable} from 'rxjs';

export interface SponsorsService {
  getSponsorsFrom(src: string): Observable<Sponsors>;
}
