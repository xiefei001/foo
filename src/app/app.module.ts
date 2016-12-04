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
import {FmStattgefundenComponent} from "./util/fm-stattgefunden/fm-stattgefunden.component";
import { FmAccordionComponent } from './util/accordion/fm-accordion.component';
import {FmAccordionPanelComponent} from "./util/accordion/fm-accordion-panel.component";

@NgModule({
  declarations: [
    AppComponent,
    FmModalDirective,
    FmCanvasDirective,
    FmSignatureComponent,
    FmSketchComponent,
    FmProtocolComponent,
    FmStattgefundenComponent,
    FmAccordionComponent,
    FmAccordionPanelComponent
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
