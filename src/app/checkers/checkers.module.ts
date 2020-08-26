import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CheckersRoutingModule } from './checkers-routing.module';

import { MatButtonModule } from '@angular/material/button';

import { CheckersComponent } from './checkers.component';

@NgModule({
  declarations: [
    CheckersComponent
  ],
  imports: [
    SharedModule,
    CheckersRoutingModule,
    MatButtonModule
  ],
  exports: [
    CheckersComponent
  ]
})
export class CheckersModule { }
