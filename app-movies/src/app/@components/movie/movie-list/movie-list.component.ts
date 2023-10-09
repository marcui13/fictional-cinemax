import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Movie } from 'src/app/@models/movie.model';
import { MOCK_MOVIES } from 'src/mock-data/movies.mock';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = MOCK_MOVIES.movies;
  filteredMovies: Movie[] = [];
  showSearchBar: boolean = false;
  searchText: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleSearch() {
    this.showSearchBar = !this.showSearchBar;
    this.searchText = ''; // Reiniciar el texto de búsqueda cuando se muestra la barra de búsqueda
  }

  onSearchInput(event: any) {
    // Filtrar películas solo si hay al menos 2 caracteres en la búsqueda
    if (this.searchText.length >= 1) {
      this.filteredMovies = this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredMovies = []; // Reiniciar la lista de películas filtradas si no se cumple la condición
    }
  }

  onSearchCancel() {
    this.showSearchBar = false;
    this.searchText = ''; // Reiniciar el texto de búsqueda cuando se cancela la búsqueda
    this.filteredMovies = []; // Reiniciar la lista de películas filtradas
  }

  openMovieDetail(movieId: number) {
    // Navega al componente 'movie-detail' con el ID de la película como parámetro
    this.router.navigate(['/movie-detail']);
  }

  editMovie(movieId: number) {
    // Implementa la lógica de edición de la película aquí
    const movieIdString = movieId.toString();
    localStorage.setItem('movieId', movieIdString);
    this.router.navigate(['/movie-detail']);
  }

  navigateTo(page: string) {
    // Realiza la navegación a la página deseada
    this.router.navigate([`/${page}`]);
  }

  logout() {
    // Implementa la lógica para cerrar sesión
    // Por ejemplo, puedes eliminar el token de autenticación y redirigir a la página de inicio de sesión
    this.router.navigateByUrl('/login');
  }

  createRating(rating: number) {
    const totalStars = 5;
    const starIcon = '★';
    const emptyIcon = '☆';

    // Redondea la puntuación al entero más cercano
    const roundedRating = Math.round(rating);

    // Asegúrate de que la puntuación esté dentro del rango válido (0 a totalStars)
    const clampedRating = Math.max(0, Math.min(totalStars, roundedRating));

    const stars = starIcon.repeat(clampedRating);
    const empty = emptyIcon.repeat(totalStars - clampedRating);

    return stars + empty;
  }
}
