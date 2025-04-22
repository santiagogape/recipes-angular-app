import {AboutUsSponsors} from '../../../../models/about/about.us.sponsors';
import {Observable} from 'rxjs';

export interface AboutUsSponsorsService {
  getSponsorsFrom(src: string): Observable<AboutUsSponsors>;
}
