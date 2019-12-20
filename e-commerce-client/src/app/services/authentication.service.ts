import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../ecommerce/models/user';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post('http://localhost:8080/login', { userName: username, password: password })
    }

    logout(str:string): Observable<null> {
        // remove user from local storage to log user out
        return of(null);
    }


    testBackAtuth(username, password) {
        return this.http.post('http://localhost:8080/login', { userName: username, password: password })
        .pipe(
          map(res => console.log('resINService',res))
        )   
     }
}