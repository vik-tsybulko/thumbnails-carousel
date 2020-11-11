import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import carouselData from './carouselData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('carousel1', { static: false }) private carousel1: ElementRef<CarouselComponent>;
  @ViewChild('carousel2', { static: false }) private carousel2: ElementRef<CarouselComponent>;

  public carouselData = carouselData;
  private activeCarousel: 'carousel1' | 'carousel2' = 'carousel1';

  public ngAfterViewInit() {
    this.carousel1.carouselBody.nativeElement.focus();
  }

  // Quick workaround for navigation between carousels
  @HostListener('window:keydown', ['$event.code'])
  handleKeydown(code: string) {
    switch (code) {
      case 'ArrowUp':
        if (this.activeCarousel === 'carousel2') {
          this.activeCarousel = 'carousel1';
          this.carousel1.carouselBody.nativeElement.focus();
        }
        break;

      case 'ArrowDown':
        if (this.activeCarousel === 'carousel1') {
          this.activeCarousel = 'carousel2';
          this.carousel2.carouselBody.nativeElement.focus();
        }
        break;

      default:
        break;
    }
  }
}
