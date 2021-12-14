import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authObs: Observable<AuthResponseData>;

  constructor(private auth: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const { email, password } = form.value;
    this.isLoading = true;
    if (!this.isLoginMode) {
      this.authObs = this.auth.signup(email, password);
    }else{
      // login 
      this.authObs = this.auth.login(email , password);
    }

    this.authObs.subscribe(
      (resData) => {
        console.log('resData ', resData);
        this.isLoading = false;
        this.router.navigate(['./recipes']);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    )

    form.reset();
  }
}
