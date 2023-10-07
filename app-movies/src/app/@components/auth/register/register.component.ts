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
    // Verifica que todos los campos estén completos
    if (this.username && this.email && this.password) {
      // Obtiene la lista actual de usuarios
      const users = this.apiService.getUsers();

      // Calcula el próximo ID disponible para el nuevo usuario
      const nextUserId =
        users.length > 0
          ? Math.max(...users.map((user: any) => user.id)) + 1
          : 1;

      // Crea un nuevo objeto de usuario con los datos del formulario y el nuevo ID
      const newUser = {
        id: nextUserId,
        username: this.username,
        email: this.email,
        password: this.password,
      };

      // Llama al método para crear usuario en el ApiService
      this.apiService.createUser(newUser);

      // Notifica al usuario que se ha creado con éxito
      this.notificationService.showSuccess('User created successfully', 'top');

      // Restablece los campos del formulario
      this.username = '';
      this.email = '';
      this.password = '';
    } else {
      // Muestra una advertencia si algún campo está incompleto
      this.notificationService.showWarning('Complete all fields', 'top');
    }
  }
}
