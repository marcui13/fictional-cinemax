import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/@services/api.service';
import { NotificationService } from 'src/app/@services/notification.service';
import { ModalController } from '@ionic/angular';
import { MovieDetailModalComponent } from '../movie-detail-modal/movie-detail-modal.component';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [NotificationService, MatSnackBar],
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movieId!: number;
  movie: any;
  loadedData: boolean = false;
  userRating: number = 0;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private apiService: ApiService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {
    this.movie = {
      id: 0,
      title: 'string',
      description: 'string',
      year: 0,
      rate: 0,
      imagePath: 'string',
    };
  }

  ngOnInit() {}

  ionViewWillEnter() {
    const movieId = localStorage.getItem('movieId');
    if (movieId) {
      this.movieId = parseInt(movieId);
    } else {
      this.movie = {
        id: 0,
        title: 'string',
        description: 'string',
        year: 0,
        rate: 0,
        imagePath: 'string',
      };
    }
    this.movie = this.apiService.getMovieById(this.movieId);
    this.userRating = this.movie.rate;
    this.loadedData = true;
  }

  async deleteMovie() {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this movie?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Delete',
          handler: () => {
            this.apiService.deleteMovie(this.movieId);
            this.notificationService.showError('Movie deleted!', 'bottom');
            this.router.navigateByUrl('/movie-list');
          },
        },
      ],
    });

    await alert.present();
  }

  rateMovie(rating: number) {
    this.userRating = rating;
    this.saveRating();
  }

  saveRating() {
    this.movie.rate = this.userRating;
    this.apiService.updateMovie(this.movie);
    this.notificationService.showInfo('Rating saved!', 'bottom');
  }

  async openEditDescriptionModal() {
    const modal = await this.modalController.create({
      component: MovieDetailModalComponent,
      componentProps: {
        description: this.movie.description,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.role === 'save' && result.data && result.data.description) {
        this.movie.description = result.data.description;
        this.apiService.updateMovie(this.movie);
        this.notificationService.showSuccess('Description updated!', 'bottom');
      }
    });

    return await modal.present();
  }
}
