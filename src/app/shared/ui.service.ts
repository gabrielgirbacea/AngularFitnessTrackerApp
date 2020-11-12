import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message: string, action: any, duration: number): void {
    this.snackbar.open(message, action, { duration: duration });
  }
}
