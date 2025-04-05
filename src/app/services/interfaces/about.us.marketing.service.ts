import {Observable} from 'rxjs';
import {AboutUsMarketing} from '../../models/interfaces/about.us.marketing';

export interface AboutUsMarketingService {
  getOurMarketing(src: string): Observable<AboutUsMarketing>
}
