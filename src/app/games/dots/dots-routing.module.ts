import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DotsComponent } from './dots.component';

const routes: Routes = [
  {
    path: '',
    component: DotsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DotsRoutingModule { }
