import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieLayoutComponent } from './componentes/movie-layout/movie-layout.component';
import { MainViewComponent } from './componentes/main-view/main-view.component';
import { MainComponent } from './componentes/main/main.component';

const routes: Routes = [
  { path: 'movie/:id', component: MovieLayoutComponent },
  {path:'main' , component:MainComponent},
  {path:"", redirectTo: "main", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
