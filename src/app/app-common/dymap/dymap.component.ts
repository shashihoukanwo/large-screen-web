import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import MapService from '../service/mapservice/mapservice'
import { AppOptions } from "../class/app-options";
import { isNullOrUndefined } from "util";
import { HttpService } from "../service/http/http.service";
import { DyMap } from "./dymap.class";
import { AppUtil } from '../app-util'
const echarts = require('echarts/lib/echarts');

@Component({
    selector: 'app-dymap',
    templateUrl: './dymap.component.html',
    styleUrls: ['./dymap.component.scss'],
    providers: [AppUtil]
})

export class DymapComponent implements OnChanges {
    ngOnChanges(changes: SimpleChanges): void {
        let option = changes['option'].currentValue;
        if (option.init) {
            this.init(option);
        }
    }
    unit:string;
    value:number;
    name: string;
    requestCount: number;
    successCount: number;
    legendColor: string;
    @Input('option')
    option: AppOptions;
    @ViewChild('chartDiv') chartDiv: ElementRef;
    constructor(
        private util: AppUtil,
        private httpService: HttpService,
        private mapService: MapService) {
    }
    private loadData(chart: any, url: string, params: Map<string, any>, interval: number, showLoading: boolean) {
        if (showLoading) {
            chart.showLoading();
        }
        this.httpService.get(url, params)
            .map(data => data as DyMap)
            .subscribe(data => {
                this.value = data.data.value;
                this.unit = data.data.unit;
                this.name = data.data.name;
                this.requestCount = data.data.stat.count;
                this.successCount = data.data.stat.successCount;
                data.data.series.forEach(item=>{
                    item['value']=item.value*1000;
                });
                chart.setOption({
                    series: [{
                        data: data.data.series
                    }]
                });
                chart.hideLoading();
                let self = this;
                if (interval > 0) {
                    setTimeout(function () {
                        self.loadData(chart, url, params, interval, false);
                    }, interval * 1000);
                }
            });
    }
    private initEcharts(option: AppOptions, mapType: string) {
        const chart = echarts.init(this.chartDiv.nativeElement);
        let pieces = this.util.splitPieces(option.legendMax*1000, 5);
        chart.setOption({
            visualMap: {
                left: -1000,
                pieces: pieces,
                color: option.colors,
                textStyle: {
                    color: '#fff'
                }
            },
            silent: true,
            series: [{
                type: 'map',
                map: mapType,
                itemStyle: {
                    normal: {
                        areaColor: '#163356',
                        label: false
                    }
                }
            }]
        });
        this.loadData(chart, option.url, option.paramsMap, option.interval, false);
    }    /**
     * 初始化UI及数据
     * @param option
     */
    private init(option: AppOptions) {
        this.legendColor = option.legendColor;
        let mapType = option.paramsMap.get('map');

        if (isNullOrUndefined(echarts.getMap(mapType))) {
            this.mapService.getMapData(mapType)
                .subscribe(mapJson => {
                    echarts.registerMap(mapType, mapJson);
                    this.initEcharts(option, mapType);
                });
        } else {
            this.initEcharts(option, mapType);
        }
    }

}
