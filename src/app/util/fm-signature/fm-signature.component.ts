import {Component, ViewChild, ElementRef} from '@angular/core';
import {FmCanvasDirective} from "../canvas/fm-canvas.directive";


class LogicalPoint {
  constructor(public x: number, public y: number) {
  }

}
@Component({
  selector: 'fm-signature',
  templateUrl: './fm-signature.component.html',
  styleUrls: ['./fm-signature.component.css']
})
export class FmSignatureComponent {


  @ViewChild(FmCanvasDirective)
  private signatureCanvas: FmCanvasDirective;

  reset(){
    this.signatureCanvas.clear();
  }

}
