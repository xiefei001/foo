/*
 * Copyright 2016 SWM Services GmbH
 */
import {Directive, ElementRef, Renderer, Input, HostListener, Output, EventEmitter} from '@angular/core';

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
  selector: '[fmCanvas]'
})
export class FmCanvasDirective {

  @Input('width')
  private _defaultLogicalWidth: number = 300;

  @Input('height')
  private _defaultLogicalHeight: number = 150;

  @Output()
  touchStatus: EventEmitter<string> = new EventEmitter<string>();

  private _defaultPaintColor: string = 'blue';

  private _defaultLineWidth: number = 2;


  private drawing: boolean = false;
  private currentLogicalPoint: LogicalPoint;
  private mode: string = 'pen';



  constructor(private element: ElementRef, private renderer: Renderer) {
    element.nativeElement.addEventListener('touchstart', ()=>{
      this.touchStatus.emit("touchstart only on event listener");
    });
  }


  @Input()
  set defaultPaintColor(colorName: string) {
    this._defaultPaintColor = colorName || this._defaultPaintColor;
    console.log("newww color: " + this._defaultPaintColor);
  }

  @Input()
  set defaultLineWidth(lineWidth: number) {
    this._defaultLineWidth = lineWidth || this._defaultLineWidth;
  }


  @HostListener('mousedown', ['$event'])
  private onMousedown(event: any) {
    this.touchStatus.emit("mouse down" + this.drawing);
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
      if (this.mode === 'pen') {
        context.globalCompositeOperation = "source-over";
        // draw line from current point to new point
        context.moveTo(this.currentLogicalPoint.x, this.currentLogicalPoint.y);
        context.lineTo(newPoint.x, newPoint.y);
        context.strokeStyle = this._defaultPaintColor;
        context.lineWidth = this._defaultLineWidth;
        console.log("painting: " + this._defaultPaintColor + this._defaultLineWidth);
        context.stroke();
      } else {
        // erase Mode
        context.globalCompositeOperation = "destination-out";
        context.arc(newPoint.x, newPoint.y, 8, 0, Math.PI * 2, false);
        context.fill();
      }
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
    this.touchStatus.emit('touch event fired');
    if (event.changedTouches.length === 1) {
      this.touchStatus.emit('touch event fired' + event.changedTouches.length);
      let touch: Touch = event.changedTouches[0];
      func(touch);
      event.preventDefault();
    }
  }

  public clear() {
    let canvas = this.element.nativeElement;
    let context = this.element.nativeElement.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  public changeMode(mode: string) {
    this.mode = mode;
  }


  private getLogicalPointFromEvent(event: any) {
    let canvasRect = this.element.nativeElement.getBoundingClientRect();
    let x = ((event.clientX - canvasRect.left) / (canvasRect.right - canvasRect.left)) * this._defaultLogicalWidth;
    let y = ((event.clientY - canvasRect.top) / (canvasRect.bottom - canvasRect.top)) * this._defaultLogicalHeight;
    return new LogicalPoint(x, y);
  }


}
