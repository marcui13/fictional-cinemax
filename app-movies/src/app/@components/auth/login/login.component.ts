import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/@models/user.model';
import { NotificationService } from 'src/app/@services/notification.service';
import { MOCK_USERS } from 'src/mock-data/users.mock';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [NotificationService, MatSnackBar],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<User>();
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onLogin() {
    const user = MOCK_USERS.users.find(
      (u: User) => u.username === this.username && u.password === this.password
    );

    if (this.username && this.password) {
      if (user) {
        // console.log('Usuario encontrado', user);
        this.loginSuccess.emit(user); // Emite un evento de éxito de inicio de sesión
        this.username = '';
        this.password = '';
        this.notificationService.showSuccess('Welcome!', 'top');
        this.router.navigateByUrl('/movie-list');
      } else {
        // this.error = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
        this.notificationService.showError('Wrong credentials', 'top');
      }
    } else {
      this.notificationService.showWarning('Complete all fields', 'top');
    }
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  forgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }
}
