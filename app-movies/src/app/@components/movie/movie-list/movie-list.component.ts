import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController, MenuController } from '@ionic/angular';
import { Movie } from 'src/app/@models/movie.model';
import { ApiService } from 'src/app/@services/api.service';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  showSearchBar: boolean = false;
  searchText: string = '';
  closeItemOption: boolean = false;
  loading: boolean = false;
  loader: any;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private menuController: MenuController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.movies = this.apiService.getMovies();
  }

  ionViewWillEnter() {
    this.loading = true; // Activar el estado de carga

    // Mostrar el spinner mientras se cargan los datos
    this.presentLoading();

    // Llama al método getMovies de ApiService para cargar las películas
    this.movies = this.apiService.getMovies();

    // Simula una carga de datos durante 3 segundos
    setTimeout(() => {
      this.loading = false; // Desactivar el estado de carga
      if (this.loader) {
        this.loader.dismiss(); // Ocultar el spinner si está visible
      }
    }, 1500);
  }

  async presentLoading() {
    this.loader = await this.loadingController.create({
      message: 'Loading...',
      duration: 1500,
    });
    await this.loader.present();
  }

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
    this.closeItemOption = true; // Cierra el ion-item-option
    this.router.navigate(['/movie-detail']);
  }

  navigateTo(page: string) {
    // Realiza la navegación a la página deseada
    this.router.navigate([`/${page}`]);
  }

  logout() {
    // Implementa la lógica para cerrar sesión
    // Por ejemplo, puedes eliminar el token de autenticación y redirigir a la página de inicio de sesión
    this.menuController.close(); // Cierra el menú lateral
    this.router.navigateByUrl('/login');
  }

  createRating(rating: number) {
    const totalStars = 5;
    const starIcon = '★';
    const emptyIcon = '☆';

    const stars = starIcon.repeat(rating);
    const empty = emptyIcon.repeat(totalStars - rating);

    return stars + empty;
  }
}
