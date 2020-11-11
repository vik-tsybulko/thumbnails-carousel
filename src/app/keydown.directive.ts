import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appKeydownLeft], [appKeydownRight]'
})
export class KeydownDirective {

  @Output() 'appKeydownLeft' = new EventEmitter<void>();
  @Output() 'appKeydownRight' = new EventEmitter<void>();


  constructor() { }

  @HostListener('keydown', ['$event.code'])
  handleKeydown(code: string) {
    switch (code) {
      case 'ArrowLeft':
        this.appKeydownLeft.emit();
        break;

      case 'ArrowRight':
        this.appKeydownRight.emit();
        break;

      default:
        break;
    }
  }
}
