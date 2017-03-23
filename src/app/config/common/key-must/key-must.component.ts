import {Component,Input} from '@angular/core';
@Component({
    selector:'key-must',
    styleUrls:['key-must.component.css'],
    templateUrl:'key-must.component.html'
})
export class KeyMustComponent{
    @Input() optionName:string;//元素名称
    constructor(){};
}
