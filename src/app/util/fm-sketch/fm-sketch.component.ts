import {Component, OnInit, HostListener, ViewChild, AfterViewInit, Output} from '@angular/core';
import {FmCanvasDirective} from "../canvas/fm-canvas.directive";
import {EventEmitter} from "@angular/forms/src/facade/async";

@Component({
  selector: 'fm-sketch',
  templateUrl: './fm-sketch.component.html',
  styleUrls: ['./fm-sketch.component.css']
})
export class FmSketchComponent implements AfterViewInit {

  @ViewChild('selectColor')
  private farbDropdown: any;

  @ViewChild(FmCanvasDirective)
  private canvas: FmCanvasDirective;


  private isDropdownColorVisible = false;

  private colors: Array<string> = ["black", "yellow", "green"];

  private lineWidths: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private eraseActive: boolean = false;


  @Output()
  close: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngAfterViewInit(): void {
    this.canvas.defaultPaintColor = this.colors[0];
  }

  ngOnInit() {
  }

  onColorSelectChange(value: string) {
    if (value == null) {
      return;
    }
    this.canvas.defaultPaintColor = value;
  }

  onLineWidthSelectChange(value: number) {
    if (value == null) {
      return;
    }
    this.canvas.defaultLineWidth = value;
  }

  onEraseChange() {
    this.eraseActive = !this.eraseActive;
    if (this.eraseActive) {
      this.canvas.defaultPaintColor = 'white';
    } else {
      this.canvas.defaultPaintColor = this.farbDropdown.nativeElement.value;
    }
  }

  clean() {
    this.canvas.clear();
  }

  cancel() {
    this.clean();
    this.close.emit(null);
  }
}
