import { Component, ElementRef, ViewChild, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import MapService from '../../service/mapservice/mapservice';
const echarts = require('echarts');
import { HttpService } from '../../service/http/http.service';
import { AppOptions } from "../../class/app-options";

@Component({
    selector: 'cdn-map',
    template: `<h3>CDN-帝联</h3>
                <div class="per-cdn-con">
                    <div class="per-cdn-map">
                        <div #cdnmap style="width:100%;height:100%;margin:0px auto;"></div>
                    </div>
                    <ul class="per-cdn-txt clearfix">
                        <li>
                            <h4>响应时间</h4>
                            <span>0.1s</span>
                        </li>
                        <li>
                            <h4>可用率</h4>
                            <span>99.9%</span>
                        </li>
                        <li>
                            <h4>请求次数</h4>
                            <span>123214</span>
                        </li>
                    </ul>
                </div>`,
    styles: [`
        .per-cdn li{float:left;width:202px;text-align:center}
        .per-cdn-con{border:1px solid #37638c;padding:10px 6px 14px}
        .per-cdn>ul>li:nth-child(1),.per-cdn>ul>li:nth-child(2){margin-right:20px}
        .per-cdn-map{width:100%;height:122px;display:inline-block}
        .per-cdn-txt{margin-top:10px}
        .per-cdn-txt li{float:left;width:58px;text-align:center}
        .per-cdn-txt>li:nth-child(1),.per-cdn-txt>li:nth-child(2){margin-right:7px}
        .per-cdn-txt li>h4{font-size:9pt;color:#9eb2dd;height:1pc;line-height:1pc}
        .per-cdn-txt li>span{display:block;color:#9eb2dd;font-size:9pt;height:26px;line-height:26px;text-align:center;background:#055559;margin-top:5px;font-weight:300}
        h3{font-size:9pt;height:36px;line-height:36px;width:100%;text-align:center;margin-bottom:10px}
    `]
})
export class CdnmapComponetns implements OnInit, OnChanges {
    @ViewChild('cdnmap') cdnmap: ElementRef;
    @Input() options: AppOptions;
    private chart: any;

    constructor(
        private _MapService: MapService,
        private _httpService: HttpService
    ) {
    }

    private _initMap(data: any): void {
        const mapTyp: string = this.options.paramsMap.get('map');
        this._MapService.getMapData(mapTyp).subscribe(mapjson => {
            echarts.registerMap(mapTyp, mapjson);
            const options = {
                visualMap: {
                    min: 0,
                    max: this.options.legendMax,
                    inRange: {
                        color: this.options.colors
                    },
                    show:false
                },
                series: [{
                    type: 'map',
                    map: mapTyp,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#549958',
                            borderColor: '#000'
                        },
                        emphasis: {
                            areaColor: '#BBBA77'
                        }
                    },
                    zoom: 1.2,
                    data: [
                        { name: '黑龙江', value: 228 },
                        { name: '上海', value: 6 },
                        { name: '重庆', value: 5 },
                        { name: '河南', value: 4 },
                        { name: '澳门', value: 0 }
                    ]
                }]
            };
            this.chart.setOption(options);//
        });
    };

    ngOnInit() {
        const _map = this.cdnmap.nativeElement
        this.chart = echarts.init(_map);
    }

    ngOnChanges(changes: SimpleChanges) {
        let _opt: AppOptions = changes['options'].currentValue;
        if (_opt.init) {
            this.options = _opt;
            this._httpService.getData('/app/performance-cdn-region/1').subscribe(data => {
                this._initMap(data);
            });
        }
    }
}