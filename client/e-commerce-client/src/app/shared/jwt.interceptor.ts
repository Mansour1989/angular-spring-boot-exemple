import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Store,Select } from '@ngxs/store';
import { AuthState } from '../store-auth-ngxs/auth-state-ngxs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    @Select (AuthState.isAuthenticated) isAuthenticated ;
    @Select (AuthState.token) token ;


    constructor(private store: Store) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
      this.token.subscribe(success => {
          console.log('succeeiNTERCEPTOR',success)
      });
        const token = this.store.selectSnapshot(state => state.auth.token);

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }

}