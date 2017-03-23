import {Component,Input} from '@angular/core';
@Component({
    selector:'key-option',
    styleUrls:['key-option.component.css'],
    templateUrl:'key-option.component.html'
})
export class KeyOptionComponent{
    @Input() optionName:string;

    constructor(){};
}