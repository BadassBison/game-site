import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TicTacToeRoutingModule } from './tic-tac-toe-routing.module';

import { TicTacToeComponent } from './tic-tac-toe.component';

@NgModule({
  declarations: [
    TicTacToeComponent
  ],
  imports: [
    SharedModule,
    TicTacToeRoutingModule
  ],
  exports: [
    TicTacToeComponent
  ]
})
export class TicTacToeModule { }
