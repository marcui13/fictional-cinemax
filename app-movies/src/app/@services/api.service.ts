import { Injectable } from '@angular/core';
import { User } from '../@models/user.model';
import { Movie } from '../@models/movie.model';
import { MOCK_MOVIES } from 'src/mock-data/movies.mock';
import { MOCK_USERS } from 'src/mock-data/users.mock';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {
    // Carga los datos iniciales en el localStorage al iniciar el servicio
    this.loadInitialData();
  }

  // Método para cargar datos iniciales en el localStorage
  private loadInitialData() {
    const usersFromLocalStorage = localStorage.getItem('users');
    const moviesFromLocalStorage = localStorage.getItem('movies');
    const logoPathFromLocalStorage = localStorage.getItem('logoPath');

    if (!usersFromLocalStorage) {
      localStorage.setItem('users', JSON.stringify(MOCK_USERS));
    }

    if (!moviesFromLocalStorage) {
      localStorage.setItem('movies', JSON.stringify(MOCK_MOVIES));
    }

    if (!logoPathFromLocalStorage) {
      localStorage.setItem('logoPath', '../../../../assets/logos/logo1.jpg');
    }
  }

  // Métodos para usuarios
  getUsers(): User[] {
    const usersFromLocalStorage = localStorage.getItem('users');
    if (usersFromLocalStorage) {
      return JSON.parse(usersFromLocalStorage).users;
    }
    return [];
  }

  createUser(newUser: User) {
    const usersFromLocalStorage = localStorage.getItem('users');
    if (usersFromLocalStorage) {
      const users = JSON.parse(usersFromLocalStorage).users;
      const id = users.length + 1;
      newUser.id = id;
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify({ users }));
    }
  }

  updateUser(updatedUser: User) {
    const usersFromLocalStorage = localStorage.getItem('users');
    if (usersFromLocalStorage) {
      const users = JSON.parse(usersFromLocalStorage).users;
      const userIndex = users.findIndex(
        (user: User) => user.id === updatedUser.id
      );
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify({ users }));
      }
    }
  }

  deleteUser(userId: number) {
    const usersFromLocalStorage = localStorage.getItem('users');
    if (usersFromLocalStorage) {
      const users = JSON.parse(usersFromLocalStorage).users;
      const filteredUsers = users.filter((user: User) => user.id !== userId);
      localStorage.setItem('users', JSON.stringify({ users: filteredUsers }));
    }
  }

  // Métodos para películas
  getMovies(): Movie[] {
    const moviesFromLocalStorage = localStorage.getItem('movies');
    if (moviesFromLocalStorage) {
      return JSON.parse(moviesFromLocalStorage).movies;
    }
    return [];
  }

  // Método para obtener películas como un observable
  // getMovies(): Observable<Movie[]> {
  //   const moviesFromLocalStorage = localStorage.getItem('movies');
  //   if (moviesFromLocalStorage) {
  //     const movies = JSON.parse(moviesFromLocalStorage).movies;
  //     return of(movies);
  //   }
  //   return of([]);
  // }

  createMovie(newMovie: Movie) {
    const moviesFromLocalStorage = localStorage.getItem('movies');
    if (moviesFromLocalStorage) {
      const movies = JSON.parse(moviesFromLocalStorage).movies;
      const id = movies.length + 1;
      newMovie.id = id;
      movies.push(newMovie);
      localStorage.setItem('movies', JSON.stringify({ movies }));
    }
  }

  updateMovie(updatedMovie: Movie) {
    const moviesFromLocalStorage = localStorage.getItem('movies');
    if (moviesFromLocalStorage) {
      const movies = JSON.parse(moviesFromLocalStorage).movies;
      const movieIndex = movies.findIndex(
        (movie: Movie) => movie.id === updatedMovie.id
      );
      if (movieIndex !== -1) {
        movies[movieIndex] = updatedMovie;
        localStorage.setItem('movies', JSON.stringify({ movies }));
      }
    }
  }

  deleteMovie(movieId: number) {
    const moviesFromLocalStorage = localStorage.getItem('movies');
    if (moviesFromLocalStorage) {
      const movies = JSON.parse(moviesFromLocalStorage).movies;
      const filteredMovies = movies.filter(
        (movie: Movie) => movie.id !== movieId
      );
      localStorage.setItem(
        'movies',
        JSON.stringify({ movies: filteredMovies })
      );
    }
  }
}
