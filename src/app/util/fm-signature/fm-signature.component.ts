import {Component, ViewChild} from '@angular/core';
import {FmCanvasDirective} from "../canvas/fm-canvas.directive";

@Component({
  selector: 'fm-signature',
  templateUrl: './fm-signature.component.html',
  styleUrls: ['./fm-signature.component.css']
})
export class FmSignatureComponent {


  @ViewChild(FmCanvasDirective)
  private signatureCanvas: FmCanvasDirective;

  private status: string = 'aaaaaaaaaaaaaaa';


  clean(){
    this.signatureCanvas.clear();
    this.status = "cccccc";
  }

  public showStatus(value:string) {
    this.status = value;
  }

}
