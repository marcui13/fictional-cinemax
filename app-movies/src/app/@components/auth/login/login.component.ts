import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/@models/user.model';
import { ApiService } from 'src/app/@services/api.service';
import { NotificationService } from 'src/app/@services/notification.service';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [NotificationService, MatSnackBar, Storage],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  error: string = '';
  logoPath: string = '../../../../assets/logos/logo1.jpg';

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    const logoPath = localStorage.getItem('logoPath');
    if (logoPath) {
      this.logoPath = logoPath;
    }
  }

  onLogin() {
    const users: User[] = this.apiService.getUsers();

    const user = users.find(
      (u: User) => u.username === this.username && u.password === this.password
    );

    if (user) {
      this.username = '';
      this.password = '';
      this.notificationService.showSuccess(
        `Welcome ${user.username}!`,
        'bottom'
      );
      this.router.navigateByUrl('/movie-list');
    } else {
      this.notificationService.showError('Invalid credentials', 'top');
    }
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  forgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }
}
