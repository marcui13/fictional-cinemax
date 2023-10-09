import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Movie } from 'src/app/@models/movie.model';
import { ApiService } from 'src/app/@services/api.service';
import { NotificationService } from 'src/app/@services/notification.service';
import { MOCK_MOVIES } from 'src/mock-data/movies.mock';
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
    private modalController: ModalController
  ) {
    this.movie = {
      id: 0,
      title: 'string',
      description: 'string',
      year: 0,
      rate: 0,
      imagePath: 'string',
    };
    this.loadedData = true;
  }

  ngOnInit() {
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
    // Obtener el ID de la película desde los parámetros de la ruta
    // this.movieId = +this.route.snapshot.paramMap.get('id');

    // Buscar la película por ID en los datos mock
    this.movie = MOCK_MOVIES.movies.find((movie) => movie.id === this.movieId);

    // Inicializar la variable de calificación con la calificación de la película
    this.userRating = this.movie.rate;
  }

  editMovie() {
    // Redirigir a la página de edición de la película con el ID como parámetro
    // this.router.navigate(['/edit-movie', this.movieId]);
    this.notificationService.showInfo('Movie edited!', 'bottom');
  }

  deleteMovie() {
    // Implementa la lógica de eliminación de la película utilizando el ApiService
    this.apiService.deleteMovie(this.movieId); // Llama al método deleteMovie del ApiService
    this.notificationService.showError('Movie deleted!', 'bottom');
    this.router.navigateByUrl('/movie-list');
  }

  rateMovie(rating: number) {
    this.userRating = rating; // Establece la calificación del usuario

    // Llama al método saveRating para guardar la calificación en el ApiService
    this.saveRating();
  }

  saveRating() {
    // Actualiza la calificación de la película en el objeto movie
    this.movie.rate = this.userRating;
    // Llama al método updateMovie del ApiService para actualizar la película con la nueva calificación
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
        // Actualiza la descripción de la película con la nueva descripción
        this.movie.description = result.data.description;
        // Llama al método updateMovie del ApiService para guardar la nueva descripción
        this.apiService.updateMovie(this.movie);
        this.notificationService.showSuccess('Description updated!', 'bottom');
      }
    });

    return await modal.present();
  }
}
