import {inject, Injectable} from '@angular/core';
import {AboutUsTeamService} from '../interfaces/about.us.team.service';
import {Observable} from 'rxjs';
import {AboutUsTeam} from '../../models/about/about.us.team';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: "root"})
export class JsonAboutUsTeamService implements AboutUsTeamService {
  http: HttpClient = inject(HttpClient)

  getTeam(src: string): Observable<AboutUsTeam> {
    return this.http.get<AboutUsTeam>(src).pipe();
  }
}
