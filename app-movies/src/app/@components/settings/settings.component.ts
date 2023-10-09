import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IonicModule } from '@ionic/angular';
import { NotificationService } from 'src/app/@services/notification.service';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [NotificationService, MatSnackBar],
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  logos: string[] = [
    '../../../../assets/logos/logo1.jpg',
    '../../../../assets/logos/logo2.jpg',
    '../../../../assets/logos/logo3.jpg',
    // Agrega más rutas de imágenes de logotipo aquí
  ];
  selectedLogo: string = ''; // Ruta del logotipo seleccionado

  constructor(private notificationService: NotificationService) {}

  changeLogo(logo: string) {
    this.selectedLogo = logo; // Cambia el logotipo seleccionado
    // Almacena la ruta del logotipo seleccionado en el almacenamiento local
    localStorage.setItem('logoPath', this.selectedLogo);
    this.notificationService.showSuccess('Logo changed!', 'bottom');
  }

  getLogoName(logo: string) {
    // Puedes implementar una función para mostrar el nombre del logotipo si lo deseas
    // Por ejemplo, puedes obtener el nombre del archivo desde la ruta.
    // Ejemplo: './assets/logos/logo1.png' -> 'logo1'
    const parts = logo.split('/');
    const fileName = parts[parts.length - 1].split('.')[0];
    return fileName;
  }
}
