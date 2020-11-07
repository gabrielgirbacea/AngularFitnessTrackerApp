import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService
  ) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  maxDate: Date;
  isLoading = false;
  loadingSubscription: Subscription;

  // Build the form
  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    termsAndConditions: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (loadingStatus) => (this.isLoading = loadingStatus)
    );
  }
  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
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
