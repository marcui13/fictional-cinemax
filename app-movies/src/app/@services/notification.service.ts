import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(
    message: string,
    type: string,
    action: string = 'Cerrar',
    duration: number = 5000,
    verticalPosition: 'top' | 'bottom' = 'top'
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: [type],
      data: { type: type },
      horizontalPosition: 'end',
      verticalPosition: verticalPosition,
    });
  }

  showToast(message: string, duration: number = 20000) {
    this.showNotification(message, 'toast', 'X', duration, 'bottom');
  }

  showSuccess(message: string, verticalPosition: 'top' | 'bottom') {
    this.showNotification(message, 'success', 'X', 5000, verticalPosition);
  }

  showError(message: string, verticalPosition: 'top' | 'bottom') {
    this.showNotification(message, 'error', 'X', 4000, verticalPosition);
  }

  showWarning(message: string, verticalPosition: 'top' | 'bottom') {
    this.showNotification(message, 'warning', 'X', 4000, verticalPosition);
  }

  showInfo(message: string, verticalPosition: 'top' | 'bottom' = 'bottom') {
    this.showNotification(message, 'info', 'X', 4000, verticalPosition);
  }
}
