import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { CarouselComponent } from './carousel/carousel.component';
import { KeydownDirective } from './keydown.directive';

@NgModule({
  declarations: [
    AppComponent,
    ThumbnailComponent,
    CarouselComponent,
    KeydownDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
