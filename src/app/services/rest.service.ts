import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UrlService } from './url.service';
import { LocalStorageService } from './local-storage.service';

export const AccessDeniedMsg = 'Session Expired,Please Re-Login';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    protected http: HttpClient,
    private router: Router,
    private urlService: UrlService,
    private localDataService: LocalStorageService) { }


  getImageData(options?) {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'multipart/form-data'
      }
    );
    return {
      headers,
      ...options
    };
  }

  getAuthenticationOptions(options?) {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    );
    return {
      headers,
      ...options
    };
  }

  get<TOut>(url: string, options?): Promise<TOut> {
    const opt = this.getAuthenticationOptions(options);
    if (!opt) {
      return Promise.reject('Auth Failed, Token Invalid or Missing');
    }
    return this.http.get(url, opt)
      .toPromise()
      .catch(e => this.handleError(e));
  }

  getImage<TOut>(url: string, options?): Promise<TOut> {
    const opt = this.getImageData(options);
    if (!opt) {
      return Promise.reject('Auth Failed, Token Invalid or Missing');
    }
    return this.http.get(url, opt)
      .toPromise()
      .catch(e => this.handleError(e));
  }

  post<TOut>(url: string, arg: any, options?): Promise<TOut> {
    const opt = this.getAuthenticationOptions(options);
    if (!opt) {
      return Promise.reject('Auth Failed, Token Invalid or Missing');
    }
    return this.http.post(url, arg, this.getAuthenticationOptions(options)).toPromise()
      .catch(e => this.handleError(e));
  }

  postFormData<TOut>(url: string, arg: any, options?): Promise<TOut> {
    return this.http.post(url, arg, options).toPromise()
      .catch(e => this.handleError(e));
  }

  put<TOut>(url: string, arg: any, options?): Promise<TOut> {
    const opt = this.getAuthenticationOptions(options);
    if (!opt) {
      return Promise.reject('Auth Failed, Token Invalid or Missing');
    }
    return this.http.put(url, JSON.stringify(arg), opt)
      .toPromise()
      .catch(e => this.handleError(e));
  }

  delete(url: string, options?): Promise<any> {
    const opt = this.getAuthenticationOptions(options);
    if (!opt) {
      return Promise.reject('Auth Failed, Token Invalid or Missing');
    }
    return this.http.delete(url, this.getAuthenticationOptions(options))
      .toPromise()
      .catch(e => this.handleError(e));
  }

  private handleError(error: any): Promise<any> {
    try {
      if (error && error.status === 0) {
        const msg = `No internet connection`;
        return Promise.reject(msg);
      }

      if (isDevMode()) {
        console.error(error);
      }

      if (error && error.status && (error.status === 401 || error.status === 403)) {
        return Promise.reject(error);  //  AccessDeniedMsg
      }

      return Promise.reject('error' + (error.error || error.message));
    } catch (e) {
      const msg = `Something goes wrong,please try again later`;
      return Promise.reject(msg);
    }
  }
}
