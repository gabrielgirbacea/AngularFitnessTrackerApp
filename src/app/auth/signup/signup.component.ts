import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private fb: FormBuilder) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  maxDate: Date;

  // Build the form
  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    termsAndConditions: ['', [Validators.required]],
  });

  // Public methods

  signup(): void {
    // if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      // this.authService.signup(this.emailControl.value.trim(), this.passwordControl.value.trim()).subscribe(
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
    return this.signupForm.get('email');
  }

  get passwordControl(): AbstractControl {
    return this.signupForm.get('password');
  }

  get birthdateControl(): AbstractControl {
    return this.signupForm.get('birthdate');
  }

  get termsAndConditionsControl(): AbstractControl {
    return this.signupForm.get('termsAndConditions');
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
