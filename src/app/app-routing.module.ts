import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const currentRoute = 'home';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'checkers',
        loadChildren: () => import('./checkers/checkers.module').then(m => m.CheckersModule)
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
