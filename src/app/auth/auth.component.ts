import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;

  constructor(private auth: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const { email, password } = form.value;

    if (!this.isLoginMode) {
      this.auth.signup(email, password).subscribe(
        (resData) => {
          console.log('resData ', resData);
        },
        (error) => {
          console.log('Error ', error);
        }
      );
    }

    form.reset();
  }
}
