import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StateModule } from './state/state.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UtilitiesService } from './shared/utilities/utilities.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StateModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [UtilitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
