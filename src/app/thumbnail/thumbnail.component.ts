import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent {
  @Input() thumbnail: any;
  @Input() tabIndex: number;
  @Input() active: boolean;

  public useFallbackImage = false;
  public imageLoaded = false;

  constructor(
    public elementRef: ElementRef
  ) { }

}
