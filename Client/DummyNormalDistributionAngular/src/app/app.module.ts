import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SliderModule } from 'primeng/slider';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NormalConfigurationComponent } from './shared/components/normal-configiration/normal-configuration.component';
import { HttpClientModule } from '@angular/common/http';
import { NormalService } from './shared/services/normal/normal.service';

@NgModule({
  declarations: [
    AppComponent,
    NormalConfigurationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SliderModule,
    HttpClientModule
  ],
  providers: [NormalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
