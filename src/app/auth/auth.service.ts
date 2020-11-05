import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
  constructor(private router: Router) {}

  authChange = new Subject<boolean>();
  private user: User;

  registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };

    this.authSuccessfully();
  }

  login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };

    this.authSuccessfully();
  }

  logout(): void {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  // Use the spread operator to return the user in order to return a new user so other
  // parts of our applications will not modify the user from the service.
  getUser(): User {
    return { ...this.user };
  }

  isAuth(): boolean {
    return this.user != null;
  }

  private authSuccessfully(): void {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
