import { Component, Input, OnInit, ViewChild, ElementRef, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'counter',
    template: `
                <div  #digwrap class="dataStatistics per-dau-num">
                    <div class="digit_set"></div>
                    <div class="digit_set"></div>
                    <div class="digit_set"></div>
                    <div class="digit_set"></div>
                    <div class="digit_set"></div>
                    <div class="digit_set"></div>
                    <div class="digit_set set_last"></div>
                </div>
    `,
    styles: [`
                @-webkit-keyframes flipTop{0%{-webkit-transform:perspective(400px) rotateX(0)}to{-webkit-transform:perspective(400px) rotateX(-90deg)}}
                @-webkit-keyframes flipBottom{0%{-webkit-transform:perspective(400px) rotateX(90deg)} to{-webkit-transform:perspective(400px) rotateX(0)}}
                .dataStatistics{height:26px;line-height:26px;color:#76cbff;font-size:16px;}
                .dataStatistics .seperator{display:inline;margin:0 -20px;vertical-align:top}
                .dataStatistics .days,.dataStatistics .hours,.dataStatistics .minutes,.dataStatistics .seconds{display:inline;height:100%}
                .dataStatistics .digit_set{position:relative;float:left;display:inline-block;margin:0;width:21px;height:100%;margin-right:4px;}
                .dataStatistics .digit{position:absolute;left:0;height:100%}
                .dataStatistics .digit>div{position:absolute;left:0;overflow:hidden;padding:0 6px;width:11px;height:50%}
                .dataStatistics .digit>div.digit_top,.dataStatistics .digit>div.shadow_top{top:0;z-index:0;box-sizing:border-box;width:21px}
                .dataStatistics .digit>div.digit_top:before,.dataStatistics .digit>div.shadow_top:before{position:absolute;top:0;left:0;width:100%;height:100%;content:""}
                .dataStatistics .digit>div.shadow_top{width:21px;opacity:0;-webkit-transition:opacity .3s ease-in}
                .dataStatistics .digit>div.digit_bottom,.dataStatistics .digit>div.shadow_bottom{bottom:0;z-index:0}
                .dataStatistics .digit>div.digit_bottom .digit_wrap,.dataStatistics .digit>div.shadow_bottom .digit_wrap{position:absolute;bottom:0;display:block;margin-top:-95%}
                .dataStatistics .digit>div.digit_bottom:before,.dataStatistics .digit>div.shadow_bottom:before{position:absolute;top:0;left:0;width:100%;height:100%;content:""}
                .digit_wrap{display:block;overflow:hidden;line-height:26px}
                .dataStatistics .digit>div.shadow_bottom{opacity:0;-webkit-transition:opacity .3s ease-in}
                .dataStatistics .digit.previous .digit_top,.dataStatistics .digit.previous .shadow_top{z-index:2;opacity:1;-webkit-transform-origin:50% 100%;transform-origin:50% 100%;-webkit-animation:flipTop .3s ease-in both;-moz-animation:flipTop .3s ease-in both;-ms-transform-origin:50% 100%;animation:flipTop .3s ease-in both}
                .dataStatistics .digit.previous .digit_bottom,.dataStatistics .digit.previous .shadow_bottom{z-index:1;opacity:1}
                .dataStatistics .digit.active .digit_top{z-index:1}
                .dataStatistics .digit.active .digit_bottom{z-index:2;-webkit-transform-origin:50% 0;transform-origin:50% 0;-webkit-animation:flipBottom .3s .3s ease-out both;-moz-animation:flipBottom .3s .3s ease-out both;-ms-transform-origin:50% 0;animation:flipBottom .3s .3s ease-out both}
                .per-dau{position:absolute;top:24px;left:50%;color:#9eb2dd;text-align:center;transform:translateX(-50%)}
                .per-dau-title{margin-bottom:5px;height:17px;background:url(images/dau-title.svg) center no-repeat}
                .per-dau-num>div{display:inline-block;width:21px;height:26px;background:url(images/dau-bg.svg) no-repeat}
                .per-map-rtitle{position:absolute;top:10px;right:14px}
                .per-map-rcircle{display:inline-block;width:19px;height:19px;background:url(images/system-circle.svg) repeat;vertical-align:middle}
                .per-system-icon{position:absolute;top:4px;right:5px;display:inline-block;width:9px;height:10px;background:url(images/android.svg) repeat}
                .per-map-rtxt{position:relative;top:1px;display:inline-block;margin-right:5px}
    `],
    encapsulation: ViewEncapsulation.None
})
export class CounterComponent implements OnInit, OnChanges {
    @ViewChild('digwrap') digwrap: ElementRef;
    @Input() value: number;
    private options = {
        start: 0,
        end: 0,
        time: 1000,
        len: 7
    };
    private el;
    private timer;
    private currentNum;
    private isReady = false;

    constructor() {

        this.currentNum = this.zeroize(this.options.start, this.options.len).toString().split("");
    }

    zeroize(num, size) {
        let s = "000000000" + num;
        return s.substr(s.length - size);
    }
    private hasClass(obj, cls) {
        if (obj == null) console.log('%c%s', 'font-size:32px;color:red;', cls);
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
    private addClass(obj, cls) {
        if (!this.hasClass(obj, cls)) obj.className += " " + cls;
    }
    private removeClass(obj, cls) {
        if (this.hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    }

    //初始化digit
    private initTemplate(): void {
        this.el = this.digwrap.nativeElement.querySelector('.set_last');
        let digitSets = this.digwrap.nativeElement.querySelectorAll('.digit_set');
        for (let n = 0, len = digitSets.length; n < len; n++) {
            let dig = digitSets[n];
            for (let i = 0; i <= 9; i++) {
                let digitNode = document.createElement('div');
                digitNode.className = 'digit';
                digitNode.innerHTML = `<div class="digit_top" style="background: url(images/dau-bg.svg) no-repeat;">
						                    <span class="digit_wrap"></span>
                                        </div>
                                        <div class="shadow_top"></div>
                                        <div class="digit_bottom" style="background: url(images/dau-bg.svg) no-repeat scroll 0px -14px;">
                                            <span class="digit_wrap"></span>
                                        </div>
                                        <div class="shadow_bottom"></div>`;
                dig.appendChild(digitNode);
                let currentDigit: any = dig.querySelectorAll('.digit')[i];
                currentDigit.querySelectorAll('.digit_wrap')[0].innerHTML = i;
                currentDigit.querySelectorAll('.digit_wrap')[1].innerHTML = i;
            }
        }
    }
    //填充初始化数据 0-9
    private fillContent(isreset: boolean = true): void {
        if (isreset) {
            let digitArr = this.digwrap.nativeElement.querySelectorAll('.digit');
            for (let i = 0, len = digitArr.length; i < len; i++) {
                let _digit = digitArr[i];
                if (this.hasClass(_digit, 'active')) this.removeClass(_digit, 'active');
                if (this.hasClass(_digit, 'previous')) this.removeClass(_digit, 'previous');
            }
        }
        for (let i = 0, len = this.currentNum.length; i < len; i++) {
            let val = Number(this.currentNum[i]);//0031456
            let set = this.digwrap.nativeElement.querySelectorAll('.digit_set')[i];
            let digit = set.querySelectorAll('.digit')[val];
            this.addClass(set.querySelectorAll('.digit')[val], 'active');
            this.addClass(set.querySelectorAll('.digit')[val + 1], 'previous');
        }
    }
    //当数字翻到9的时候，前一位数执行一次动画
    private turnPrev(ths: any): void {
        let current = ths.querySelector('.active');
        if (!current) return;

        let previous = ths.querySelector('.previous');
        if (!previous) return;

        this.removeClass(previous, 'previous');
        this.removeClass(current, 'active');
        this.addClass(current, 'previous');
        let next = current.nextElementSibling;
        if (!next) {
            this.addClass(ths.querySelectorAll('.digit')[0], 'active');
            let prev = ths.previousElementSibling;
            if (prev) {
                this.turnPrev(prev);
            }
        } else {
            this.addClass(next, 'active');
        }
    }

    //最后一位数
    private increase(difference: number): number {
        const _this = this;
        if (difference < 1) {
            clearInterval(_this.timer);
            return 0;
        }
        difference--;

        //翻牌效果
        let current = _this.el.querySelector('.active');
        let previous = _this.el.querySelector('.previous');
        _this.removeClass(previous, 'previous');
        _this.removeClass(current, 'active');
        _this.addClass(current, 'previous');

        let next = current.nextElementSibling;
        if (!next) {
            _this.addClass(_this.el.querySelectorAll('.digit:first-child')[0], 'active')
            let prev = _this.el.previousElementSibling;
            _this.turnPrev(prev);
        } else {
            _this.addClass(next, 'active');
        }

        return difference;
    }
    //启动			
    private start(add: boolean = true): void {
        const _this = this;
        //要执行动画的次数
        let difference = _this.options.end - _this.options.start;
        if (difference > 200) _this.options.time = 3000;
        //每次动画执行时间
        let t = _this.options.time / difference;

        _this.timer = setInterval(() => {

            difference = _this.increase(difference);
        }, t);
    }//end run

    public clear() {
        this.options = {
            start: 0,
            end: 0,
            time: 1000,
            len: 7
        };
        this.currentNum = this.zeroize(this.options.start, this.options.len).toString().split("");
        this.fillContent();
    }
    ngOnInit() {

        this.initTemplate();

        this.fillContent(false);

        this.isReady = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.isReady) return;
        let currentValue = changes['value'].currentValue;
        if (currentValue == 0) {
            this.clear();
            return;
        }
        if (currentValue == this.options.end) return;
        let start: boolean = currentValue > this.options.end;
        this.options.start = this.options.end;
        this.options.end = currentValue;
        if (start) {
            this.currentNum = this.zeroize(this.options.start, this.options.len).toString().split("");
            this.fillContent();
            this.start();
        } else {
            if (currentValue < 10) {
                this.clear();
                this.options.end = currentValue;
                this.start();
            } else {
                this.options.start = currentValue;
                this.options.end = currentValue;
                this.currentNum = this.zeroize(this.options.start, this.options.len).toString().split("");
                this.fillContent();
            }
        }
    }

    onOnDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}