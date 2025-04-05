import {IndexMarketing} from '../../models/interfaces/index.marketing';
import {Observable} from 'rxjs';

export interface IndexMarketingService {
  getMarketingSections(src: string): Observable<IndexMarketing[]>
}
