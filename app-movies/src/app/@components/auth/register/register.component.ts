import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/@services/notification.service';
import { ApiService } from 'src/app/@services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [NotificationService, MatSnackBar],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.username && this.email && this.password) {
      const users = this.apiService.getUsers();
      const nextUserId =
        users.length > 0
          ? Math.max(...users.map((user: any) => user.id)) + 1
          : 1;
      const newUser = {
        id: nextUserId,
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.apiService.createUser(newUser);
      this.notificationService.showSuccess(
        `User ${newUser.username} created successfully`,
        'bottom'
      );
      this.username = '';
      this.email = '';
      this.password = '';
    } else {
      this.notificationService.showError('Complete all fields', 'bottom');
    }
  }
}
