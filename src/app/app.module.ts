import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {FmImageScaleService} from './service/fm-image-scale.service';
import { FmModalDirective } from './util/modal/fm-modal.directive';
import { FmSignatureComponent } from './util/fm-signature/fm-signature.component';
import {FmCanvasDirective} from "./util/canvas/fm-canvas.directive";
import { FmSketchComponent } from './util/fm-sketch/fm-sketch.component';
import { FmProtocolComponent } from './util/fm-protocol/fm-protocol.component';

@NgModule({
  declarations: [
    AppComponent,
    FmModalDirective,
    FmCanvasDirective,
    FmSignatureComponent,
    FmSketchComponent,
    FmProtocolComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [FmImageScaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
