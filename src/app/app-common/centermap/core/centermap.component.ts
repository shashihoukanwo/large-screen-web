import { Component, ElementRef, ViewChild, Input, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import MapService from '../../service/mapservice/mapservice';
import { HttpService } from '../../service/http/http.service';
const echarts = require('echarts');
import GeoTransformService from '../../service/geo-transform.service';
import { AppOptions } from "../../class/app-options";
import { RumAppConfigService } from '../../../rumapp/rumapp.config.service';
import RangeService from '../../service/mapservice/range.service';
import { AppUtil } from '../../app-util';

@Component({
    selector: 'app-centermap',
    templateUrl: './centermap.component.html',
    styleUrls: ['./centermap.component.scss'],
    providers: [AppUtil, MapService]
})
export class CentermapComponent implements OnDestroy, OnInit, OnChanges {
    @ViewChild('appCenterMap') mapEle: ElementRef;
    @Input() public options: AppOptions
    public isReady: boolean = false;
    public colors: Array<string>;
    public maxValue: number;
    private chart = null;
    private timer;// 定时器
    public DAU: number = 0;
    public isPuffOut: boolean = false;
    constructor(
        private _MapService: MapService,
        private _httpService: HttpService,
        private configService: RumAppConfigService,
        private rangeService: RangeService,
        private util: AppUtil,
        private _geoService: GeoTransformService) {
        const _this = this;
        _this.isReady = false;
        // _this.isPuffOut = true;
        // setInterval(() => {

        //     _this.isPuffOut = true;
        //     _this.DAU += 1;
        //     setTimeout(function () {
        //         _this.isPuffOut = false;
        //     }, 850);
        // }, 1000)
    }

    private _initMap(data: any): void {
        const _this = this;
        const mapTyp: string = this.options.paramsMap.get('map');
        let pieces = this.util.splitPieces(this.options.legendMax * 1000, 5);
        _this._MapService.getMapData(mapTyp).subscribe(mapjson => {
            echarts.registerMap(mapTyp, mapjson);
            //显示热点省份名称
            const list = data.data.series;
            let series = [];
            list.forEach((item, index) => {
                const max = _this.options.legendMax;
                const i = _this.rangeService.Pitch(item.value, max);
                const showEffectOn = _this.rangeService.IsShowEffect(item.value, max, 0.6);
                const scale = _this.rangeService.RippleEffect(item.value, max, 32, 0.6);
                series.push({
                    type: 'effectScatter',
                    showEffectOn: 'render',
                    coordinateSystem: 'geo',
                    zlevel: 4,
                    rippleEffect: {
                        period: 2,
                        brushType: 'stroke',
                        scale: scale
                    },
                    // symbol: 'path://M10.946,7.999c0,1.628-1.319,2.947-2.947,2.947l0,0c-1.627,0-2.946-1.318-2.946-2.947l0,0c0-1.627,1.319-2.946,2.946-2.946l0,0C9.627,5.053,10.946,6.372,10.946,7.999L10.946,7.999z',
                    symbolSize: showEffectOn ? 6 : 1,
                    data: [item].map((dataItem) => {
                        let xyv = _this._geoService.Transform(dataItem.name);
                        xyv[2] = dataItem.value * 1000;
                        return {
                            name: dataItem.name,
                            value: xyv
                        };
                    })
                });
            });

            const option = {
                visualMap: {
                    left: -1000,
                    pieces: pieces,
                    color: _this.colors,
                    textStyle: {
                        color: '#fff'
                    }
                },
                geo: {// 地图
                    map: mapTyp,
                    label: {
                        normal: {
                            show: false,
                            borderWidth: 2,
                            shadowBlur: 50
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#031522',
                            borderColor: '#076DA1'
                        },
                        emphasis: {
                            areaColor: '#0174AA'
                        }
                    },
                    roam: false,
                    zoom: 1.2
                },
                series: series
            };
            _this.chart.setOption(option);
        });
    }


    private i: number = 0;
    private nums: Array<number> = [45, 3, 34, 21, 56, 46, 9, 0, 200];
    ngOnInit() {
        const _map = this.mapEle.nativeElement;
        this.chart = echarts.init(_map);
        this.colors = this.configService.getCenterMapColors().reverse();
    }

    ngOnChanges(changes: SimpleChanges): void {
        let currentValue = changes['options'].currentValue;
        let _opt: AppOptions = Object.assign(currentValue, {});
        if (_opt.init) {
            this.maxValue = _opt.legendMax;
            this._httpService.getData(_opt.url).subscribe(data => {
                this.isReady = true;
                this._initMap(data);
                setInterval(() => {
                    this.DAU = this.nums[this.i];
                    if (this.i <= 6) this.i++; else this.i = 0;
                }, 3500);
            });

            // this.timer = setInterval(() => {
            //     this._httpService.getData(_opt.url).subscribe(data => {

            //         this.isReady = true;
            //         this._initMap(data);
            //     });
            //     console.log('did setinterval');
            // }, 8000);

        }
    }

    ngOnDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }



}