import { Injectable } from "@angular/core";
import { User } from "../ecommerce/models/user";
import { Observable, of, throwError } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const MOCK_USER = new User();
MOCK_USER.id = 1;
MOCK_USER.email = "a";
MOCK_USER.username = "Foo";
MOCK_USER.lastName = "Bar";
MOCK_USER.password = "a";

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(private http: HttpClient) { }


  /**
   * Authenticate the user
   *
   * @param {string} email The user's email address
   * @param {string} password The user's password
   * @returns {Observable<User>} The authenticated user observable.
   */
  public signin(email: string, password: string): Observable<User> {
    // Normally you would do an HTTP request to determine to
    // attempt authenticating the user using the supplied credentials.
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      return of(MOCK_USER);
    }
    return throwError(new Error("Invalid email or password"));
  }


  /**
   * Returns the authenticated user
   * @returns {User}
   */
  public authenticatedUser(): Observable<User> {
    // Normally you would do an HTTP request to determine if
    // the user has an existing auth session on the server
    // but, let's just return the mock user for this example.
    return of(MOCK_USER);
  }
  /**
   * End session
   * @returns {Observable<boolean>}
   */
  public signout(): Observable<null> {
    // Normally you would do an HTTP request sign end the session
    // but, let's just return an observable of true.
    return of(null);
  }


  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

}
