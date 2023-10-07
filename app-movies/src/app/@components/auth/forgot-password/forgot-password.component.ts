import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IonicModule } from '@ionic/angular';
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
  email: string = '';

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    // Lógica para enviar solicitud de restablecimiento de contraseña
    // Puedes implementar llamadas a servicios o API aquí
  }
}
