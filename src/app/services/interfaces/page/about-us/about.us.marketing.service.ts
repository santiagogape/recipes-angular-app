import {Observable} from 'rxjs';
import {AboutUsMarketing} from '../../../../models/about/about.us.marketing';

export interface AboutUsMarketingService {
  getOurMarketing(src: string): Observable<AboutUsMarketing>
}
