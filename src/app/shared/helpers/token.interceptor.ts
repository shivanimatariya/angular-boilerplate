import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private localDataService: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.localDataService.getCurrentUserData()) {
      const jwtToken = JSON.parse(localStorage.getItem('token'));
      const isApiUrl = request.url.startsWith(environment.baseUrl);

      if (jwtToken && jwtToken.access_token) {
        if (isApiUrl) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${jwtToken.access_token}` }
          });
        }
      }
    }
    return next.handle(request);
  }
}
