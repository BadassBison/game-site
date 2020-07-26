import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CheckersComponent } from './checkers/checkers.component';

const currentRoute = 'home';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'checkers',
    component: CheckersComponent
  },
  {
    path: '',
    redirectTo: currentRoute,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: currentRoute
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
