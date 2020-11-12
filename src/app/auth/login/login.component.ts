import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {} from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  isLoading$: Observable<boolean>;

  // Build the form
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  // Public methods

  login(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login({
        email: this.emailControl.value.trim(),
        password: this.passwordControl.value.trim(),
      });
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
