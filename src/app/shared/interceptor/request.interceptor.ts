import {Inject, Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../services/storage.service';
import {environment} from '../../../environments/environment';
import {
  NB_AUTH_INTERCEPTOR_HEADER,
  NbAuthService,
  NbAuthToken,
  NbTokenService,
} from '@nebular/auth';
import {map, switchMap} from 'rxjs/operators';
// import {SpinnerService} from '../services/spinner.service';

/**
 * Interceptors that inject token in the requests
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
// tslint:disable-next-line:no-trailing-whitespace

  constructor(
    private localStorageService: LocalStorageService,
    private tokenService: NbTokenService,
    // private spinnerService: SpinnerService,

    private injector: Injector,
    @Inject(NB_AUTH_INTERCEPTOR_HEADER) protected headerName: string = 'Authorization',
  ) {
  }


  // /**
  //  * Retrieves current authenticated token stored
  //  * @returns {Observable<any>}
  //  */
  // getToken(): Observable<NbAuthToken> {
  //   return this.tokenService.get();
  // }

  /**
   * Inject token from local storage in the request
   * @param request
   * @param next
   * @returns
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiUrl = request.url.startsWith(environment.baseUrl);
    const isLogin = request.url.includes('login');
    // check if the url request is for our domain and is not /login

    return this.authService.getToken().pipe(
      switchMap((token: NbAuthToken) => {
        const tokenValue = token.getValue();
        if (isApiUrl) {
          if (!isLogin) {
            request = request.clone({
              setHeaders: {
                [this.headerName]: `Bearer ${tokenValue}`,
              },
            });
          } else {
            request = request.clone({
              setHeaders: {
                'appname': environment.roleAllowed,
              },
            });
          }
        }
        return next.handle(request);
      }),
    );








    // // start spinner before request is performed
    // // this.spinnerService.load();
    //   return next.handle(request)
    //     .pipe((req) => {
    //       // this.spinnerService.stop();
    //       return req;
    //     });
  }

  protected get authService(): NbAuthService {
    return this.injector.get(NbAuthService);
  }
}
