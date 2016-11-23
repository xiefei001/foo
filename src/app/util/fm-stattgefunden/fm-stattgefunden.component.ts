import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'fm-stattgefunden',
  templateUrl: './fm-stattgefunden.component.html',
  styleUrls: ['./fm-stattgefunden.component.css']
})
export class FmStattgefundenComponent implements OnInit {
  @Input()
  private stattgefunden = false;

  @Input()
  private begehungsdatum: string = 'Kein Datum vorhanden';

  @Input()
  private text: string = '';

  private anschlussobjekt = {begehung: {stattgefunden: true}};

  constructor() {
  }

  ngOnInit() {
  }

}
