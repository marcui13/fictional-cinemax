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

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuController.close();
    this.movies = this.apiService.getMovies();
  }

  toggleSearch() {
    this.showSearchBar = !this.showSearchBar;
    this.searchText = '';
  }

  onSearchInput(event: any) {
    if (this.searchText.length >= 1) {
      this.filteredMovies = this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredMovies = [];
    }
  }

  onSearchCancel() {
    this.showSearchBar = false;
    this.searchText = '';
    this.filteredMovies = [];
  }

  openMovieDetail(movieId: number) {
    // Navega al componente 'movie-detail' con el ID de la película como parámetro
    this.router.navigate(['/movie-detail']);
  }

  editMovie(movieId: number) {
    const movieIdString = movieId.toString();
    localStorage.setItem('movieId', movieIdString);
    this.closeItemOption = true;
    this.router.navigate(['/movie-detail']);
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  logout() {
    this.menuController.close();
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
