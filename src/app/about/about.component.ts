import { Component, OnInit, AfterViewInit } from '@angular/core';
console.log('about module lazy loaded !!!!')

@Component({
  selector: 'about',
  styleUrls: ['./about.component.scss'],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit, AfterViewInit {
  public value:number=0;

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }
  private i:number=0;
  private nums:Array<number>=[12,3,34,21,56,46,9,0,200];
  changeVal() {
    this.value=this.nums[this.i];
    if(this.i<=6) this.i++;
  }

}
