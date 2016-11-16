import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fm-protocol',
  templateUrl: './fm-protocol.component.html',
  styleUrls: ['./fm-protocol.component.css']
})
export class FmProtocolComponent implements OnInit {
  private showEigentuemeNeu:boolean = false;
  private showVertreter: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
