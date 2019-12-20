import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/ecommerce/models/user';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent  {
  constructor(private httpClient: HttpClient, private authenticationService:AuthenticationService) { }
  
  method1Call(): void {
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe(success => {
        console.log('Successfully Completed');
        console.log(success);
      });
  }

  method2Call(): void {
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/user12')
      .subscribe(success => {
        console.log('Successfully Completed');
        console.log(success);
      });
  }

  testBackAuth(){
    // this.authenticationService.testBackAtuth("user","password").subscribe(isValid => {
    //     console.log('ISVALID',isValid)
    // });

    this.httpClient
    .get('http://localhost:8080/login')
    .subscribe(success => {
      console.log('Successfully Completed');
      console.log(success);
    });
  }

}
