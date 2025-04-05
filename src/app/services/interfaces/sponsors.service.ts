import {AboutUsSponsors} from '../../models/interfaces/about.us.sponsors';
import {Observable} from 'rxjs';

export interface SponsorsService {
  getSponsorsFrom(src: string): Observable<AboutUsSponsors>;
}
