import {IndexMarketing} from '../../models/home/index.marketing';
import {Observable} from 'rxjs';

export interface IndexMarketingService {
  getMarketingSections(src: string): Observable<IndexMarketing[]>
}
