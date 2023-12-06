import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-layout',
  templateUrl: './movie-layout.component.html',
  styleUrls: ['./movie-layout.component.css']
})
export class MovieLayoutComponent  implements OnInit{
    movie:any;
    youtubeVideoId!:String; // ID del video de YouTube
    sanitizedYoutubeVideoUrl!: SafeResourceUrl;
  
  

    constructor(
      private movieService: MoviesService,
      private sanitizer: DomSanitizer,
      private routes:ActivatedRoute,
      private localStorage:LocalStorageService,
      private viewportScroller: ViewportScroller
    ) {}
  
    ngOnInit(): void {

      
      this.routes.params.subscribe(params=>{
        const movieId= params['id'];
        this.movieService.getData().subscribe(data=>{
          this.movie=data.find((movie:any)=> String(movie.id)===String(movieId))
          this.extractYoutubeVideoId()
          this.viewportScroller.scrollToPosition([0, 0]);

        })
      })
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

    toggleLocalStorage(id: any, title: any, img: any) {
      this.localStorage.toggleLocalStorage(id, title, img);
    }
  
    isInLocalStorage(id: any): boolean {
      return this.localStorage.isMovieInList(id);
  }
}

