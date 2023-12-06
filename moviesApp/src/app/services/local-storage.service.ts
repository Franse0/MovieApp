import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}
  private movieListSubject = new BehaviorSubject<any[]>(this.getMovieList());


  getMovieListObservable() {
    return this.movieListSubject.asObservable();
  }

  getMovieList(): any[] {
    return this.getItem('movieList') || [];
  }

  updateMovieList(newList: any[]): void {
    this.movieListSubject.next(newList);
    localStorage.setItem('movieList', JSON.stringify(newList));
  }
  
  isMovieInList(movieId: any): boolean {
    const movieList = this.getMovieList();
    return movieList.some((movie: any) => movie.id === movieId);
  }

  toggleLocalStorage(id: any, title: any, img: any): void {
    const currentList = this.getMovieList();
    const index = currentList.findIndex((movie: any) => movie.id === id);
  
    if (index !== -1) {
      // La película ya está en la lista, así que la eliminamos
      currentList.splice(index, 1);
    } else {
      // La película no está en la lista, así que la agregamos
      currentList.push({ id, title, img });
    }
  
    // Guarda la lista actualizada en el localStorage
    this.updateMovieList(currentList);
  
    console.log('Película añadida/eliminada de la lista:', title);
  
  }

  private getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  private setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
