import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IonicModule, ModalController } from '@ionic/angular';
import { NotificationService } from 'src/app/@services/notification.service';
@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [NotificationService, MatSnackBar],
  selector: 'app-movie-detail-modal',
  templateUrl: './movie-detail-modal.component.html',
  styleUrls: ['./movie-detail-modal.component.scss'],
})
export class MovieDetailModalComponent implements OnInit {
  @Input() description!: string;

  constructor(
    private modalController: ModalController,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  saveDescription() {
    // Cierra el modal y pasa la nueva descripción como resultado
    this.modalController.dismiss({ description: this.description }, 'save');
  }

  close() {
    // Cierra el modal sin guardar cambios
    this.modalController.dismiss(null, 'cancel');
  }
}
