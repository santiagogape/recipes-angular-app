import {User} from '@models/my/user';
import {Observable} from 'rxjs';

export interface StoreUser {
  store(profile: User): Observable<string> // return user generated id
}
