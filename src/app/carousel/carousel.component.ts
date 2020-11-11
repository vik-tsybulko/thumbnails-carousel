import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {
  @Input() public carouselData: any = {};
  @Input() public infinity = false;
  @Input() public carouselTabIndex = 0;

  @ViewChildren(ThumbnailComponent)               private thumbnailsRef: QueryList<ThumbnailComponent>;
  @ViewChild('carouselBody', { static: false })   private carouselBody: ElementRef;

  public isActive: boolean;
  public translateX = 0;
  public activeThumbnailIndex = 0;

  private thumbnailWidth = 0;
  private countOfThumbnailsOnViewPort = 0;
  private skippedCount = 0;

  constructor() { }

  public ngAfterViewInit(): void {
    this.carouselData?.Thumbnails?.length && this.calculateThumbnailsOnViewPort();
  }

  public nextSlide() {
    if (this.activeThumbnailIndex >= this.carouselData.Thumbnails.length - 1) {
      this.infinity && this.resetTranslation();
      return;
    }

    this.activeThumbnailIndex++;

    if (this.skippedCount + 1 >= this.countOfThumbnailsOnViewPort) {
      this.translateX -= this.thumbnailWidth;
    } else {
      this.skippedCount++;
    }
  }

  public prevSlide() {
    if (this.activeThumbnailIndex <= 0) {
      this.infinity && this.resetTranslation(true);
      return;
    }

    this.activeThumbnailIndex--;

    if (this.skippedCount === 0) {
      this.translateX += this.thumbnailWidth;
    } else {
      this.skippedCount--;
    }
  }

  private calculateThumbnailsOnViewPort() {
    const viewPortWidth = this.carouselBody.nativeElement.clientWidth;

    this.thumbnailWidth = this.getThumbnailWidth();
    this.countOfThumbnailsOnViewPort = Math.floor(viewPortWidth / this.thumbnailWidth);
  }

  private getThumbnailWidth(): number {
    const thumb = this.thumbnailsRef.first.elementRef.nativeElement;
    const thumbStyle = thumb.currentStyle || getComputedStyle(thumb);
    return thumb.clientWidth + parseFloat(thumbStyle.marginRight) * 2;
  }

  private resetTranslation(reverse = false) {
    if (reverse) {
      this.activeThumbnailIndex = this.carouselData.Thumbnails.length - 1;
      this.translateX = - this.thumbnailWidth * (this.carouselData.Thumbnails.length - this.countOfThumbnailsOnViewPort);
      this.skippedCount = this.countOfThumbnailsOnViewPort - 1;
    } else {
      this.activeThumbnailIndex = 0;
      this.translateX = 0;
      this.skippedCount = 0;
    }
  }
}
