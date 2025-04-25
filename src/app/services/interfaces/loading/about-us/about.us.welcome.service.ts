import {Observable} from 'rxjs';
import {AboutUsWelcome} from '@models/about/about.us.welcome';

export interface AboutUsWelcomeService {
  welcome(src:string): Observable<AboutUsWelcome>;
}
