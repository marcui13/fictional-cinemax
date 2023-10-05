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
      panelClass: [type], // Aplica las clases de estilo correspondientes
      data: { type: type }, // Agrega datos para personalizar estilos
      horizontalPosition: 'end',
      verticalPosition: verticalPosition,
    });
  }

  showToast(message: string, duration: number = 20000) {
    this.showNotification(message, 'toast', 'Close', duration, 'bottom');
  }

  showSuccess(message: string, verticalPosition: 'top' | 'bottom') {
    this.showNotification(message, 'success', 'Close', 3000, verticalPosition);
  }

  showError(message: string, verticalPosition: 'top' | 'bottom') {
    this.showNotification(message, 'error', 'Close', 5000, verticalPosition);
  }

  showWarning(message: string, verticalPosition: 'top' | 'bottom') {
    this.showNotification(message, 'warning', 'Close', 5000, verticalPosition);
  }

  showInfo(message: string, verticalPosition: 'top' | 'bottom' = 'bottom') {
    this.showNotification(message, 'info', 'Close', 5000, verticalPosition);
  }
}