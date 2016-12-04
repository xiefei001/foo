import {Component, Input, ViewChild, ElementRef, Renderer} from '@angular/core';
import {FmAccordionComponent} from "./fm-accordion.component";

@Component({
  selector: 'fm-accordion-panel',
  templateUrl: './fm-accordion-panel.component.html',
  styleUrls: ['./fm-accordion-panel.component.css']
})

export class FmAccordionPanelComponent {

  @Input()
  title = '';

  index: number;

  statusClass: string;

  @ViewChild('collapseChild')
  collapseChild: ElementRef;

  parent: FmAccordionComponent;

  shown: boolean = false;

  constructor(private renderer: Renderer) {
  }


  init(index: number, statusClass: string, parent: FmAccordionComponent) {
    this.index = index;
    this.statusClass = 'panel-header-' + statusClass;
    this.parent = parent;
  }

  show() {
    this.renderer.setElementClass(this.collapseChild.nativeElement, 'collapse', false);
    this.renderer.setElementClass(this.collapseChild.nativeElement, 'collapsing', true);
    this.renderer.setElementAttribute(this.collapseChild.nativeElement, 'aria-expanded', 'true');
    setTimeout(() => {
      let panelBody = this.collapseChild.nativeElement.firstElementChild;
      this.renderer.setElementStyle(this.collapseChild.nativeElement, 'height', `${panelBody.clientHeight}px`);
    }, 10);

    setTimeout(() => {
      this.renderer.setElementClass(this.collapseChild.nativeElement, 'collapsing', false);
      this.renderer.setElementClass(this.collapseChild.nativeElement, 'collapse', true);
      this.renderer.setElementClass(this.collapseChild.nativeElement, 'in', true);
      //this.renderer.setElementStyle(this.collapseChild.nativeElement, 'height', null);
      this.shown = true;
      console.log('shown:    ' + this.shown);
    }, 300);

  }

  hide() {
    this.renderer.setElementClass(this.collapseChild.nativeElement, 'collapsing', true);
    this.renderer.setElementClass(this.collapseChild.nativeElement, 'collapse', false);
    this.renderer.setElementClass(this.collapseChild.nativeElement, 'in', false);
    this.renderer.setElementAttribute(this.collapseChild.nativeElement, 'aria-expanded', 'false');
    this.renderer.setElementStyle(this.collapseChild.nativeElement, 'height', '0px');

    setTimeout(() => {
      this.renderer.setElementClass(this.collapseChild.nativeElement, 'collapsing', false);
      this.renderer.setElementClass(this.collapseChild.nativeElement, 'collapse', true);
      this.shown = false;
    }, 300);
  }

  onClick() {
    if (this.shown) {
      this.hide();
      this.parent.informShown(-1);
    } else {
      this.show();
      this.parent.informShown(this.index);
    }
  }
}


