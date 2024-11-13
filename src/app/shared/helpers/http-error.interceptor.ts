import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';

export class AppError implements Error {
  status: number;
  name: string;
  message: string;
  stack?: string;
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private localDataSerive: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if ([401, 403].includes(err.status) && this.localDataSerive.getCurrentUserData()) {
            // auto logout if 401 or 403 response returned from api
            this.localDataSerive.removeCurrentUser(); // will redirect user to login
          }

          const error = new AppError();
          error.status = err.status;

          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            error.name = err.error.name;
            error.message = err.error.message;
            error.stack = err.error.stack;
          } else if (typeof (err.error) === 'string') {
            error.message = err.error;
          } else {
            if (err.error) {
              if (err.error.message) {
                error.message = err.error.message;
              } else if (err.error.errorDescription) {
                error.name = err.error.error;
                error.message = err.error.errorDescription;
              }
            } else {
              error.message = err.statusText || '';
            }
          }

          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${err.status}, body was: ${error.message}`);
          return throwError(error);
        })
      );
  }
}
