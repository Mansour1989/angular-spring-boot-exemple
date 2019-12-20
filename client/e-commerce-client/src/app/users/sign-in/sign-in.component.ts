import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Login } from 'src/app/store-auth-ngxs/auth-action-ngxs';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  // loginForm: FormGroup;


  // constructor(private formBuilder: FormBuilder,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private _store: Store) { }

  // ngOnInit() {
  //   this.loginForm = this.formBuilder.group({
  //     email: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }

  // // convenience getter for easy access to form fields
  // get f() { return this.loginForm.controls; }

  // onSubmit(): void {
  //   this._store
  //     .dispatch(new AuthenticateAction(this.loginForm.value))
  //     .subscribe(success => {console.log('success',success) }, error => { console.log('error',error)});

  //     const token = this._store.selectSnapshot(state => state.auth.authorization);
  //     console.log('token',token)
  // }
  private url = 'http://localhost:8080/login';

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private store: Store
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/products']);
    }
  }

  ngOnInit() {

    //sessionStorage.setItem('token', '');


    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/products';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.store
         .dispatch(new Login(this.loginForm.value))
         .subscribe((success) => {
           this.router.navigate([this.returnUrl])
         }
         , error => { 
           console.log('error',error)
           this.loading = false;
          });
  }

}
