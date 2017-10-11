import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './../services';
import { Login } from './../models';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: Login = new Login();
  loading = false;
  error = '';
  formGroup: FormGroup; 
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // reset login status
    this.authService.logout();
  }

  login() {
    if (this.formGroup.valid) {
    this.loading = true;
    this.router.navigate(['/']);
    this.authService.login(this.formGroup.value.email, this.formGroup.value.password)
      .then(result => {

        if (result === true) {
          // login successful
          //this.router.navigate(['/']);
          window.location.href = '/';
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }

      }, error => {
        this.error = 'Username or password is incorrect';
        this.loading = false;
      });
    }
  }

}
