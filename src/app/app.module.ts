import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StateModule } from './state/state.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CheckersComponent } from './checkers/checkers.component';

import { UtilitiesService } from './shared/utilities/utilities.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckersComponent
  ],
  imports: [
    BrowserModule,
    StateModule,
    AppRoutingModule
  ],
  providers: [UtilitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
