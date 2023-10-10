import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/@models/user.model';
import { ApiService } from 'src/app/@services/api.service';
import { NotificationService } from 'src/app/@services/notification.service';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [NotificationService, MatSnackBar],
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email!: string;
  newPassword!: string;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  onSubmit() {
    const users: User[] = this.apiService.getUsers();
    const userToUpdate: User | undefined = users.find(
      (user) => user.email === this.email
    );
    if (this.email && this.newPassword) {
      if (userToUpdate) {
        userToUpdate.password = this.newPassword;
        this.email = '';
        this.newPassword = '';
        this.apiService.updateUser(userToUpdate);
        this.notificationService.showSuccess(
          'Contraseña actualizada con éxito.',
          'bottom'
        );
      } else {
        this.notificationService.showError('User not found', 'bottom');
      }
    } else {
      this.notificationService.showError('Complete all fileds', 'bottom');
    }
  }
}
