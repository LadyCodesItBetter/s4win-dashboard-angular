import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';
// import {SpinnerService} from '../services/spinner.service';
// import {AlertService} from '../services/alert.service';

/**
 * Interceptor for catching http requests errors
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private route: Router,
    private toastrService: NbToastrService,
  ) {}

  /**
   * Intercept request. If error is occurs, an alert will be displayed with the error message
   * @param request
   * @param next
   * @returns
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.error('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.error('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.error?.message.length === 1 ? error.error?.message[0] : error.error?.message}`;
            if (!request.url.includes('logout')) {
              if ([401, 403].includes(error.status)) {
                if (request.url.includes('auth')) {
                  this.toastrService.show('Try to check your credentials', 'Invalid credentials', { status: 'error'});
                } else {
                  this.route.navigate(['/auth']);
                  this.toastrService.show('error', errorMsg, { status: 'error'});
                }
              }
            } else {
              this.route.navigate(['/auth']);
              this.toastrService.show('error', errorMsg, { status: 'error'});
            }
          }
          // this.spinnerService.stop();
          // show error alert with error message
          return throwError(() => new Error(errorMsg));
        }),
      );
  }
}
