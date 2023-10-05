import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Movie } from 'src/app/@models/movie.model';
import { NotificationService } from 'src/app/@services/notification.service';
import { MOCK_MOVIES } from 'src/mock-data/movies.mock';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
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
  }

  editMovie() {
    // Redirigir a la página de edición de la película con el ID como parámetro
    // this.router.navigate(['/edit-movie', this.movieId]);
    this.notificationService.showSuccess('Movie edited!', 'bottom');
  }

  deleteMovie() {
    // Implementa la lógica de eliminación de la película aquí
    // Puedes utilizar el ID de la película (this.movieId) para realizar la eliminación
    this.notificationService.showError('Movie deleted!', 'bottom');
  }
}
