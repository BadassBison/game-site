import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

const defaultRoute = 'home';
const home: Route = {
  path: defaultRoute,
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
};
const checkers: Route = {
  path: 'checkers',
  loadChildren: () => import('./checkers/checkers.module').then(m => m.CheckersModule)
};
const redirectToHome: Route = {
  path: '',
  redirectTo: defaultRoute,
  pathMatch: 'full'
};
const catchAll: Route = {
  path: '**',
  redirectTo: defaultRoute,
  pathMatch: 'full'
};

const routes: Routes = [
  {
    path: '',
    children: [
      home,
      checkers,
      redirectToHome,
      catchAll
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
