import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css'],

})
export class MyListComponent  implements OnInit{
  @Input() myList: boolean = false;
  listMovies:any;

  constructor(private localStorage:LocalStorageService, private cdr: ChangeDetectorRef){

  }

  ngOnInit(): void {
    // Obtén la lista inicial
    this.listMovies = this.localStorage.getMovieList();

  
    // Suscríbete a cambios en la lista de películas
    this.localStorage.getMovieListObservable().subscribe(newList => {
      this.listMovies = newList;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

  closeNavAndList(){
    this.myList=false
  }

  toggleLocalStorage(id: any, title: any, img: any) {
    this.localStorage.toggleLocalStorage(id, title, img);
  }

  isInLocalStorage(id: any): boolean {
    return this.localStorage.isMovieInList(id);
}


}
