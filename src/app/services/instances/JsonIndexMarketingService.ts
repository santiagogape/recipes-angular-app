import {indexMarketingService} from '../interfaces/index-marketing-service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class JsonIndexMarketingService implements indexMarketingService {

  async getMarketingSections(src: string) {
    let res = await fetch(src)
    return res.json();
  }
}
