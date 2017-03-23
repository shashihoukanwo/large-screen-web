import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { TestService } from '../app-common/service/test.service';

@Component({
    selector: 'about-test',
    template: `<div (click)="_click()">{{ title }}</div>
               <div (click)="_pub()">publish event</div>`,
    styles: [`
             div{ width:100px;height:100px;border:1px solid green;text-align:center;line-height:100px; } 
             div:hover{ background-color:steelblue;cursor:pointer; }
           `]
})
export class AboutTestComponent implements OnInit {

    //父 = > 子 
    @Input()
    public title: string = "";

    //子 => 父
    @Output()
    public contentOut = new EventEmitter();

    //Service方式
    public value:number=100;

    constructor() {

    }

    // constructor(private _testService:TestService) {

    //     console.log(_testService);
    // }
    ngOnInit() {

        console.log('inut title : ' + this.title);
    }

    _click() {

        console.log('div _click !!!');
        this.contentOut.emit('abc abc');
    }

    _pub(){

        console.log('Publish Event From Child Component !!!');
        // this._testService.attack(Math.random()*this.value);
    }
}