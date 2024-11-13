import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  baseUrl = environment.baseUrl;
  private urlDict = {
    getAccessToken: '/Auth/GetAccessToken',
    getUserData: '/user/data'
  };

  constructor() {
  }
  /**
   *
   * @param urlName url name for http call
   * @param customPathParam any additional properties to be passed as part of url
   * @param pathParam any new param
   * @returns url path
   */
  getURL(urlName: string, customPathParam?: object) {
    const paths: string[] = this.urlDict[urlName].split('/');
    if (customPathParam) {
      for (let i = 0; i < paths.length; i++) {
        if (paths[i][0] === ':') {
          paths[i] = customPathParam[paths[i].split(':')[1]];
        }
      }
    }

    return `${this.baseUrl}${paths.join('/')}`;
  }
}
