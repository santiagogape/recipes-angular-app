import {Injectable} from '@angular/core';
import {AboutUsTeamService} from '../interfaces/about.us.team.service';
import {Observable} from 'rxjs';
import {AboutUsTeam} from '../../models/interfaces/about.us.team';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';

@Injectable({providedIn: "root"})
export class JsonAboutUsTeamService implements AboutUsTeamService {
  http: HttpClient = new HttpClient(new HttpXhrBackend({build: () => new XMLHttpRequest()}));

  getTeam(src: string): Observable<AboutUsTeam> {
    return this.http.get<AboutUsTeam>(src).pipe();
  }
}
