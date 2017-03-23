import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'scaleline',
    styles: [`.scale-line {
                width: 10px;
                height: 0px;
                border-top: 0.5px solid #2E7AD5;
                padding: 0px;
                background-color: #2E7AD5;
                margin-top: 10px;
                margin-left: 2px;
                margin-bottom: 2px;
                display: block;
                float: left;
                position: relative;
                zindex:9;
            }
            .actline{
                width: 10px;
                height: 2px;
                padding: 0px;
                background-color: #53F7FF;
                margin-top: 10px;
                margin-left: 2px;
                margin-bottom: 2px;
                display: block;
                float: left;
                position: relative;
                zindex:10;
                opacity:0.5;
                animation-name:linerun;
                animation-duration:3s;
                animation-timing-function:ease-in-out;
                animation-delay:.5s;
                animation-iteration-count:infinite;
                animation-direction:alternate;
                animation-play-state:running;
                -webkit-transform: translate3d(0, 0, 0);
                will-change: top;
                -webkit-backface-visibility: hidden;
            }
            @keyframes linerun{
                0%{ -webkit-transform: translate3d(0, -15px, 0); }
                50%{ -webkit-transform: translate3d(0, -208px, 0);}
                100%{ -webkit-transform: translate3d(0, -15px, 0);}
            }`],
    template: `<span *ngFor="let s of lines" class="scale-line"></span>
              <span class="actline"></span>`
})
export class ScalelineComponent implements OnInit {
    @Input() number: number;

    public lines: Array<null>;

    constructor() {

    }

    ngOnInit() {

        this.lines = new Array(this.number);
    }
}