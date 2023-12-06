import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  movie:any;
  youtubeVideoId!:String;
  sanitizedYoutubeVideoUrl:any;

  constructor(private movieService:MoviesService, private localStorage:LocalStorageService, private sanitizer:DomSanitizer){

  }
  ngOnInit(): void {
    this.movieService.getData().subscribe(data=>{
      this.movie=data.reduce((maxRatingMovie:any, currentMovie:any)=>{
        return  maxRatingMovie.rating > currentMovie.rating ? maxRatingMovie : currentMovie;
      }, data[0])
      this.extractYoutubeVideoId()
    })
  }

  toggleLocalStorage(id: any, title: any, img: any) {
    this.localStorage.toggleLocalStorage(id, title, img);
  }

  isInLocalStorage(id: any): boolean {
    return this.localStorage.isMovieInList(id);
}

  
extractYoutubeVideoId(): void {
  // Extraer el ID del video de la URL de YouTube
  const match = this.movie.trailer_link.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match && match[1]) {
    this.youtubeVideoId = match[1];
    this.sanitizeYoutubeVideoUrl();
  }
}

sanitizeYoutubeVideoUrl(): void {
  if (this.youtubeVideoId) {
    // Construir la URL segura del video de YouTube
    const youtubeUrl = `https://www.youtube.com/embed/${this.youtubeVideoId}`;
    this.sanitizedYoutubeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
  }
}
}
