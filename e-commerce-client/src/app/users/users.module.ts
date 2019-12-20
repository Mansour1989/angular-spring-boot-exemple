import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// components
import { MyAccountComponent } from "./my-account/my-account.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignOutComponent } from "./sign-out/sign-out.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

// routing
import { UsersRoutingModule } from "./users-routing.module";

// components constant
const components = [
  MyAccountComponent,
  SignInComponent,
  SignUpComponent,
  SignOutComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UsersRoutingModule
  ],
  declarations: components,
  exports: components,
})
export class UsersModule { }
