import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SliderModule} from 'primeng/slider';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
