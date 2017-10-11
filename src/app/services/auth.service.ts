import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService implements CanActivate {
  token: string;
  userId: number;
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private http: Http
  ) {
    var currentUser = JSON.parse(localStorage.getItem('gst_user'));
    this.token = currentUser && currentUser.token;
    this.userId = currentUser && currentUser.userId;
    this.isAuthenticated = currentUser ? true : false;
  }

  login(username: string, password: string) {
    return this.authenticate(username, password);
  }

  authenticate(username: string, password: string): Promise<boolean> {

    let body = {
      email: username,
      password: password
    };
    //var data = "grant_type=password&email=" + username + "&password=" + password;
    /* let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers }); */

    return this.http.post('v1/login', body)
      .toPromise()
      .then(response => {        
        if (response.json().token) {
          localStorage.setItem('gst_user', JSON.stringify({
            username: username,
            //userId: response.json().userId,
            token: response.json().token
          }));
          this.token = response.json().token;
          //this.userId = response.json().userId;
          this.isAuthenticated = true;
          return true;
        }
        else {
          return false;
        }
      });
  }

  logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    localStorage.removeItem('gst_user');
  }

  canActivate() {
    if (this.isAuthenticated) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
