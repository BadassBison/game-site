import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StateModule } from './state/state.module';
import { SharedModule } from './shared/shared.module';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';

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
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatRippleModule,
    MatToolbarModule
  ],
  providers: [UtilitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
