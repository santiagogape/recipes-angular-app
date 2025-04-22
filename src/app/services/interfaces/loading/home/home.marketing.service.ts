import {IndexMarketing} from '../../../../models/home/index.marketing';
import {Observable} from 'rxjs';

export interface HomeMarketingService {
  getMarketingSections(src: string): Observable<IndexMarketing[]>
}
