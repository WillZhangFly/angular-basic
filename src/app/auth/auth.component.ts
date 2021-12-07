import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private auth: AuthService) {}

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
      this.auth.signup(email, password).subscribe(
        (resData) => {
          console.log('resData ', resData);
          this.isLoading = false;
        },
        (errorMessage) => {
          this.isLoading = false;
          this.error = errorMessage;
        }
      );
    }

    form.reset();
  }
}
