import {AboutUsWelcome} from '../../models/interfaces/about.us.welcome';
import {Observable} from 'rxjs';

export interface AboutUsWelcomeService {
  welcome(src:string): Observable<AboutUsWelcome>;
}
