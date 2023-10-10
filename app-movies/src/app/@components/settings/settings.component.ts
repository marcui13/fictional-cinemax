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
  ];
  selectedLogo: string = '';

  constructor(private notificationService: NotificationService) {}

  changeLogo(logo: string) {
    this.selectedLogo = logo;
    localStorage.setItem('logoPath', this.selectedLogo);
    this.notificationService.showSuccess('Logo changed!', 'bottom');
  }

  getLogoName(logo: string) {
    const parts = logo.split('/');
    const fileName = parts[parts.length - 1].split('.')[0];
    return fileName;
  }
}
