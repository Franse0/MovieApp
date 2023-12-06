import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit{
  moviesList: any;
  filteredMoviesList: any; 
  filterType: string = 'relevance';

  constructor(private moviesService:MoviesService, private localStorage:LocalStorageService){

  }
  ngOnInit(): void {
    this.moviesService.getData().subscribe(data=>{
      this.moviesList=data
      this.applyFilter()
    })
  }

  toggleLocalStorage(id: any, title: any, img: any) {
    this.localStorage.toggleLocalStorage(id, title, img);
  }

  isInLocalStorage(id: any): boolean {
    return this.localStorage.isMovieInList(id);
}
applyFilter(){
  switch(this.filterType){
    case 'name':
      this.filteredMoviesList = this.moviesList.slice().sort((a:any,b:any) =>a.title.localeCompare(b.title));
      break;
      case 'relevance':
        this.filteredMoviesList = this.moviesList.slice().sort((a: any, b: any) => b.rating - a.rating);
        break;
    case 'new':
      this.filteredMoviesList = this.moviesList.slice().sort((a:any, b:any) => new Date(b.released_date).getTime() - new Date(a.released_date).getTime());
      break;
      default:
        this.filteredMoviesList = this.moviesList.slice();
        break;
    }
}
onfilterChange(){
  this.applyFilter()
}

}
