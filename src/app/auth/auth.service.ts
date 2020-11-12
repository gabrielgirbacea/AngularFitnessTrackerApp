import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { UIService } from '../shared/ui.service';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data.model';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  authChange = new Subject<boolean>();
  private isAuthenticated: boolean;

  initAuthListener(): void {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscrptions();
        this.isAuthenticated = true;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());

    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => this.uiService.showSnackbar(error.message, null, 3000))
      .finally(() =>
        this.store.dispatch(new UI.StopLoading())
      );
  }

  login(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());

    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        this.uiService.showSnackbar(error.message, null, 3000);
      })
      .finally(() =>
        this.store.dispatch(new UI.StopLoading())
      );
  }

  logout(): void {
    this.angularFireAuth.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
