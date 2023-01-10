import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LocalStorageService} from '../shared/services/storage.service';
import {NbAuthService} from '@nebular/auth';
import {tap} from 'rxjs/operators';

/**
 * Authenticated guard
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   *
   * @param authService
   * @param {LocalStorageService} localStorageService
   * @param router
   */
  constructor(
    private authService: NbAuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
  }

  /**
   * Activate the requested route if auth token exists
   * @param route
   * @param state
   * @returns
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (authenticated) {
            return true;
          } else {
            this.router.navigate(['/auth']);
            return false;
          }
        }),
      );
  }

}
