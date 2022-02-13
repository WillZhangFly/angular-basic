import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { Store } from '@ngrx/store';

import * as rootReducer from '../store/app.reducer';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<rootReducer.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.store.select("auth").pipe(
      take(1),
      map((authState) => {
        const isAuth = !!authState.user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['auth']);
      })
    );
  }
}
