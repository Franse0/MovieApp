import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { MainViewComponent } from './componentes/main-view/main-view.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieLayoutComponent } from './componentes/movie-layout/movie-layout.component';
import { MainComponent } from './componentes/main/main.component';
import { MyListComponent } from './componentes/my-list/my-list.component'
import { FormsModule } from '@angular/forms';
import { StartComponent } from './componentes/start/start.component';
import { FooterComponent } from './componentes/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainViewComponent,
    MovieLayoutComponent,
    MainComponent,
    MyListComponent,
    StartComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
