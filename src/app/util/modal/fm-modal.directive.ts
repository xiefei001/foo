import {
  Directive, HostBinding, ElementRef, Renderer, Input, HostListener, OnChanges,
  SimpleChanges, OnInit
} from '@angular/core';

export const ClassNames: any = {
  SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
  BACKDROP: 'modal-backdrop',
  OPEN: 'modal-open',
  FADE: 'fade',
  IN: 'in'
};


@Directive({
  selector: '[fmModal]',
  exportAs: 'fm-modal'
})
export class FmModalDirective implements OnInit {


  @Input()
  private hasBackdrop: boolean = true;


  // Status, ob Modal gezeigt ist.
  private isShown: boolean = false;

  dropbackElement: HTMLDivElement = void 0;

  @HostBinding('class.modal')
  private modalClass: boolean = true;

  @HostBinding('class.fade')
  private fadeClass: boolean = true;


  ngOnInit(): void {
    if (this.hasBackdrop) {
      this.dropbackElement = document.createElement('div');
      this.dropbackElement.className = 'modal-backdrop fade in';
    }
  }

  constructor(private element: ElementRef, private renderer: Renderer) {
    this.dropbackElement = document.createElement('div');
    this.dropbackElement.className = 'modal-backdrop fade in';
  }

  public show(): void {
    if (this.isShown) {
      return;
    }
    this.isShown = true;

    this.renderer.setElementClass(document.body, ClassNames.OPEN, true);

    this.renderer.setElementAttribute(this.element.nativeElement, 'aria-hidden', 'false');
    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'block');
    this.renderer.setElementProperty(this.element.nativeElement, 'scrollTop', 0);
    this.renderer.setElementClass(this.element.nativeElement, ClassNames.IN, true);

    if (this.dropbackElement) {
      document.body.appendChild(this.dropbackElement);
    }
  }

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    if (event.target === this.element.nativeElement) {
      this.hide(event);
    }

  }

  public hide(event: any): void {
    if (event) {
      event.preventDefault();
    }

    if (!this.isShown) {
      return;
    }
    this.isShown = false;

    this.renderer.setElementClass(this.element.nativeElement, ClassNames.IN, false);

    setTimeout(() => this.hideModal(), 300);
  }


  private hideModal(): void {
    this.renderer.setElementAttribute(this.element.nativeElement, 'aria-hidden', 'true');
    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
    if (this.hasBackdrop) {
      document.body.removeChild(this.dropbackElement);
      this.renderer.setElementClass(document.body, ClassNames.OPEN, false);
    }
  }
}
