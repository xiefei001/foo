/*
 * Copyright 2016 SWM Services GmbH
 */
import {Directive, ElementRef, Renderer, Input, HostListener, HostBinding} from '@angular/core';

/**
 * Local Klasse speichert die Dia
 */
class LogicalPoint {
  constructor(public x: number, public y: number) {
  }

}
/**
 * canvas für Skizzen und Signature.
 * @author xie.fei
 * @since 1.0
 */
@Directive({
  selector: '[fmCanvas]',
  exportAs: 'fm-canvas'
})
export class FmCanvasDirective {
  private _defaultPaintColor: string = 'blue';

  @Input('width')
  private _defaultLogicalWidth: number = 300;

  @Input('height')
  private _defaultLogicalHeight: number = 150;

  private drawing: boolean = false;
  private currentLogicalPoint: LogicalPoint;

  constructor(private element: ElementRef, private renderer: Renderer) {
  }


  @Input()
  set defaultPaintColor(colorName: string) {
    this._defaultPaintColor = colorName || this._defaultPaintColor;
  }


  @HostListener('mousedown', ['$event'])
  private onMousedown(event: any) {
    console.log("mouse down: " + this.drawing);
    if (event.target === this.element.nativeElement && !this.drawing) {
      this.drawing = true;
      this.currentLogicalPoint = this.getLogicalPointFromEvent(event);
      if (event.preventDefault) {
        event.preventDefault();
      }
    }

  }

  @HostListener('mousemove', ['$event'])
  private onMousemove(event: any) {

    if (event.target === this.element.nativeElement && this.drawing) {
      let newPoint = this.getLogicalPointFromEvent(event);

      let context = this.element.nativeElement.getContext('2d');
      context.beginPath();
      // draw line from current point to new point
      context.moveTo(this.currentLogicalPoint.x, this.currentLogicalPoint.y);
      context.lineTo(newPoint.x, newPoint.y);
      context.strokeStyle = 'blue';
      context.lineWidth = 2;
      context.stroke();

      // set current point to the new point.
      this.currentLogicalPoint = newPoint;
      //ctx.closePath();
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseout', ['$event'])
  private onMouseup(event: any) {
    console.log("up--------------");
    if (event.target === this.element.nativeElement && this.drawing) {
      console.log("up and target --------------");
      this.drawing = false;
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }


  // ---------------touch Events----------
  @HostListener('touchstart', ['$event'])
  private onTouchstart(event: any) {
    this.genericTouchEventHandler(event, this.onMousedown);
  }

  @HostListener('touchmove', ['$event'])
  private onTouchmove(event: any) {
    this.genericTouchEventHandler(event, this.onMousemove);
  }


  @HostListener('touchend', ['$event'])
  @HostListener('touchleave', ['$event'])
  private onTouchend(event: any) {
    this.genericTouchEventHandler(event, this.onMouseup);
  }

  private genericTouchEventHandler(event: any, func: (touch: Touch) => void): void {
    if (event.changedTouches.length === 1) {
      let touch: Touch = event.changedTouches[0];
      func(touch);
      event.preventDefault();
    }
  }


  private getLogicalPointFromEvent(event: any) {
    let canvasRect = this.element.nativeElement.getBoundingClientRect();
    let x = ((event.clientX - canvasRect.left) / (canvasRect.right - canvasRect.left)) * this._defaultLogicalWidth;
    let y = ((event.clientY - canvasRect.top) / (canvasRect.bottom - canvasRect.top)) * this._defaultLogicalHeight;
    return new LogicalPoint(x, y);
  }


  public clear() {
    let canvas = this.element.nativeElement;
    let context = this.element.nativeElement.getContext('2d');
    console.log("canvas width: " + canvas.width);
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}
