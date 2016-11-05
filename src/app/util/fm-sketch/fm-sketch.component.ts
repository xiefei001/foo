import {Component, OnInit, HostListener, ViewChild} from '@angular/core';

@Component({
  selector: 'fm-sketch',
  templateUrl: './fm-sketch.component.html',
  styleUrls: ['./fm-sketch.component.css']
})
export class FmSketchComponent implements OnInit {

  @ViewChild('farbDropdown')
  private farbDropdown: any;


  private isDropdownColorVisible = false;

  private colors: Array<string> = ["black", "yellow", "green"];

  constructor() {
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    if (this.farbDropdown.nativeElement.contains(event.target)) {
      console.log(event.target);
      if (this.isDropdownColorVisible) {
        //this.isDropdownColorVisible = false;
      }
    }

  }

  ngOnInit() {
  }

}
