import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onLogout(): void {
    this.onClose();
    this.authService.logout();
  }

  onClose(): void {
    this.sidenavClose.emit();
  }
}
