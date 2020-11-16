import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private store: Store<fromRoot.State>) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  maxDate: Date;
  isLoading$: Observable<boolean>;

  // Build the form
  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    termsAndConditions: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  // Public methods

  signup(): void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.authService.registerUser({
        email: this.emailControl.value.trim(),
        password: this.passwordControl.value.trim(),
      });
    }
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
