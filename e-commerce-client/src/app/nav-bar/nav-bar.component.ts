import { Component, OnInit } from "@angular/core";
import { User } from '../ecommerce/models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Store } from '@ngxs/store';
import { Logout } from '../store-auth-ngxs/auth-action-ngxs';
import { Select } from '@ngxs/store';
import { AuthState } from '../store-auth-ngxs/auth-state-ngxs';
import { Observable } from 'rxjs';

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  private collapsed = true;
  isAuth: boolean;
  @Select(AuthState.isAuthenticated) isAuthenticated: Observable<boolean>

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store

  ) {
  }
  ngOnInit() {
    this.isAuthenticated.subscribe(isValid => this.isAuth = !isValid)
  }

  reset() {
    console.warn("nav bbar reset home do it later")
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.store.dispatch(new Logout()).subscribe(success => {
      this.router.navigate(['/users/sign-in']);
    }, error => { });
  }
}
