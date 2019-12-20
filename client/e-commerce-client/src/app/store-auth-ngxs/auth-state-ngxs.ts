import { AuthStateModel, Login, Logout } from './auth-action-ngxs';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
      token: null,
      username: null
    }
  })
  export class AuthState {
    @Selector()
    static token(state: AuthStateModel): string | null {
      return state.token;
    }
  
    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
      return !!state.token;
    }
  
    constructor(private authService: AuthenticationService) {}
  
    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, action: Login) {
      return this.authService.login(action.payload.userName,action.payload.password).pipe(
        tap((result) => {
          if(result)
          ctx.patchState({
            token: btoa(action.payload.userName + ':' + action.payload.password),
            username: action.payload.userName
          });
        })
      );
    }
  
    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>) {
      const state = ctx.getState();
      return this.authService.logout(state.token).pipe(
        tap(() => {
          ctx.setState({
            token: null,
            username: null
          });
        })
      );
    }
  }