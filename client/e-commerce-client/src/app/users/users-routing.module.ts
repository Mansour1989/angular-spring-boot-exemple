import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// components
import { MyAccountComponent } from "./my-account/my-account.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignOutComponent } from "./sign-out/sign-out.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AuthGuard } from '../shared/authentication.guard';

// routes
const routes: Routes = [
  {
   // canActivate: [AuthGuard],
    path: "my-account",
    component: MyAccountComponent
  },
  {
    path: "sign-in",
    component: SignInComponent
  },
  {
    path: "sign-out",
    component: SignOutComponent
  },
  {
    path: "sign-up",
    component: SignUpComponent
  },
  {
    path: "**",
    redirectTo: "/404"
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class UsersRoutingModule {}
