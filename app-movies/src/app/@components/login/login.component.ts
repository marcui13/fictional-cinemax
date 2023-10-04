import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/@models/user.model';
import { MOCK_USERS } from 'src/mock-data/users.mock';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<User>();
  username: string = '';
  password: string = '';
  error: string = '';

  constructor() {}

  onLogin() {
    const user = MOCK_USERS.users.find(
      (u: User) => u.username === this.username && u.password === this.password
    );

    if (user) {
      console.log('Usuario encontrado', user);
      this.loginSuccess.emit(user); // Emite un evento de éxito de inicio de sesión
    } else {
      this.error = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
    }
  }
}
