import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckersComponent } from './checkers.component';

const routes: Routes = [
  {
    path: '',
    component: CheckersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckersRoutingModule { }
