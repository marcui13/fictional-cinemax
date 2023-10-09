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
    // Obtén la lista de usuarios desde el servicio
    const users: User[] = this.apiService.getUsers();
    // Busca un usuario con el correo electrónico proporcionado
    const userToUpdate: User | undefined = users.find(
      (user) => user.email === this.email
    );
    if (this.email && this.newPassword) {
      if (userToUpdate) {
        // Actualiza la contraseña del usuario encontrado
        userToUpdate.password = this.newPassword;
        // Resetea campos
        this.email = '';
        this.newPassword = '';
        // Guarda la actualización en el servicio
        this.apiService.updateUser(userToUpdate);
        // Puedes mostrar una notificación de éxito aquí
        this.notificationService.showSuccess(
          'Contraseña actualizada con éxito.',
          'bottom'
        );
      } else {
        // Si no se encuentra un usuario con el correo electrónico, puedes mostrar una notificación de error
        this.notificationService.showError('User not found', 'bottom');
      }
    } else {
      this.notificationService.showError('Complete all fileds', 'bottom');
    }
  }
}
