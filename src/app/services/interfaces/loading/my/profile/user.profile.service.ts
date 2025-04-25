import {Observable} from 'rxjs';
import {User} from '@models/my/user';

export interface UserProfileService {
  getProfile(src: string): Observable<User>
}
