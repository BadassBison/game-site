import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DotsRoutingModule } from './dots-routing.module';

import { DotsComponent } from './dots.component';

@NgModule({
  declarations: [
    DotsComponent
  ],
  imports: [
    SharedModule,
    DotsRoutingModule
  ],
  exports: [
    DotsComponent
  ]
})
export class DotsModule { }
