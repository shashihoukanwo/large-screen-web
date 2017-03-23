import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppOptions } from "../../class/app-options";
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'colorlump',
    styles: [`.color-area{
                width: 12px;
                height: 12px;
                margin-top: -6px;
                margin-bottom: 16px;
                display: block;
                position:relative;
            }
            .color-area>i{
                margin-left: 30px;
                font-style:normal;
                color:#fff;
            }`],
    template: `<span *ngFor="let o of lumps" class="color-area" [ngStyle]="{'background-color':o[0]}"><i>{{o[1]}}</i></span>`
})
export class ColorlumpComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() value: number;
    @Input() colors: Array<string>;
    public lumps: Array<[string, number]>;
    constructor() {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        let currentValue = changes['value'].currentValue;
        if (!isNaN(currentValue)) {
            this.value = currentValue;
            const scale = Math.ceil(this.value / 4.0);
            this.lumps = [];
            let length = this.colors.length;
            for (let i = length - 1; i >= 0; i--) {
                this.lumps.push([this.colors[length-i-1], scale * i]);
            }
        }
    }
}