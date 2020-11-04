import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private fb: FormBuilder) {}

  // Build the form
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  // Public methods

  login(): void {
    // if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // this.authService.login(this.emailControl.value.trim(), this.passwordControl.value.trim()).subscribe(
      //   () => {
      //     this.router.navigate(["/contacts"]);
      //   },
      //   error => {
      //     console.log(error);
      //     alert(error.error);
      //   }
      // );
    // }
  }

  get emailControl(): AbstractControl {
    return this.loginForm.get('email');
  }

  get passwordControl(): AbstractControl {
    return this.loginForm.get('password');
  }

  getErrorMessage(control): string {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control.hasError('email')) {
      return 'Not a valid email address';
    }

    return '';
  }
}
