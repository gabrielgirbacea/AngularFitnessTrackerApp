import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService
  ) {}

  isLoading = false;
  loadingSubscription: Subscription;

  // Build the form
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (loadingState) => (this.isLoading = loadingState)
    );
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  // Public methods

  login(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login({
        email: this.emailControl.value.trim(),
        password: this.passwordControl.value.trim(),
      });
      // .subscribe(
      //   () => {
      //     this.router.navigate(['/contacts']);
      //   },
      //   (error) => {
      //     console.log(error);
      //     alert(error.error);
      //   }
      // );
    }
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
