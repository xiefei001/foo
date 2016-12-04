import {Component, ContentChildren, QueryList, Input, AfterContentInit} from '@angular/core';
import {FmAccordionPanelComponent} from "./fm-accordion-panel.component";

@Component({
  selector: 'fm-accordion',
  templateUrl: 'fm-accordion.component.html',
  styleUrls: ['fm-accordion.component.css']
})
export class FmAccordionComponent implements AfterContentInit {


  @ContentChildren(FmAccordionPanelComponent)
  accordionPanels: QueryList<FmAccordionPanelComponent>;

  @Input()
  currentActivePanelId: number = 0;

  ngAfterContentInit(): void {
    this.accordionPanels.forEach((panel, id, arr) => {
      panel.init(id, 'info', this);
      if (id === this.currentActivePanelId) {
        panel.show();
      }
    });
  }


  informShown(id: number) {
    if (id >= 0 && this.currentActivePanelId >= 0) {
      let activePanel = this.accordionPanels.filter((panel, index) => index === this.currentActivePanelId)[0];
      activePanel.hide();
    }
    this.currentActivePanelId = id;
  }
}
