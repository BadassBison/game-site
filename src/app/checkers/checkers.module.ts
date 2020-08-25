import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CheckersRoutingModule } from './checkers-routing.module';

import { CheckersComponent } from './checkers.component';

@NgModule({
  declarations: [
    CheckersComponent
  ],
  imports: [
    SharedModule,
    CheckersRoutingModule
  ],
  exports: [
    CheckersComponent
  ]
})
export class CheckersModule { }
