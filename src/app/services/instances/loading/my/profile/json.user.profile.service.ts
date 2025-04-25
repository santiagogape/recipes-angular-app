import {inject, Injectable} from '@angular/core';
import {UserProfileService} from '@services/interfaces/loading/my/profile/user.profile.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '@models/my/user';

@Injectable({providedIn:'root'})
export class JsonUserProfileService implements UserProfileService {
  http: HttpClient = inject(HttpClient);
  constructor() {}

  getProfile(src: string): Observable<User> {
    return this.http.get<User>(src);
  }

}
