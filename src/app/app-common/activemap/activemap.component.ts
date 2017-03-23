import { Component, ViewChild, ElementRef, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import MapService from '../service/mapservice/mapservice';
import GeoTransformService from '../service/geo-transform.service';
const echarts = require('echarts');
import { HttpService } from '../service/http/http.service';
import { AppOptions } from "../class/app-options";
import { setInterval } from 'timers';

@Component({
    selector: 'active-map',
    templateUrl: './activemap.component.html',
    styleUrls: ['./activemap.component.scss']
})

export class ActivemapComponent implements OnInit, OnChanges {
    @ViewChild('activeMap') activeMap: ElementRef;
    @ViewChild('wad') wad: ElementRef;
    @Input() options: AppOptions;
    public isReady: boolean = false;
    private chart: any;

    constructor(
        private _mapService: MapService,
        private _httpService: HttpService,
        private _geoService: GeoTransformService) {
    }

    private _initMap(data: any): void {
        const mapTyp: string = this.options.paramsMap.get('map');
        let geoCoordMap = {
            '长春': [125.8154, 44.2584],
            '长沙': [113.0823, 28.2568],
            '贵阳': [106.6992, 26.7682],
            '西安': [109.1162, 34.2004],
            '深圳': [114.5435, 22.5439],
            '济南': [117.1582, 36.8701],
            '海口': [110.3893, 19.8516],
            '沈阳': [123.1238, 42.1216],
            '武汉': [114.3896, 30.6628],
            '昆明': [102.9199, 25.4663],
            '杭州': [119.5313, 29.8773],
            '成都': [103.9526, 30.7617],
            '拉萨': [91.1865, 30.1465],
            '天津': [117.4219, 39.4189],
            '合肥': [117.29, 32.0581],
            '呼和浩特': [111.4124, 40.4901],
            '哈尔滨': [127.9688, 45.368],
            '北京': [116.4551, 40.2539],
            '南京': [118.8062, 31.9208],
            '南宁': [108.479, 23.1152],
            '南昌': [116.0046, 28.6633],
            '乌鲁木齐': [87.9236, 43.5883],
            '上海': [121.4648, 31.2891]
        };
        let list = [{
            name: '长春',
            value: 90
        }, {
            name: '长沙',
            value: 10
        }, {
            name: '贵阳',
            value: 20
        }, {
            name: '西安',
            value: 20
        }, {
            name: '济南',
            value: 50
        }, {
            name: '海口',
            value: 58
        }, {
            name: '沈阳',
            value: 64
        }, {
            name: '武汉',
            value: 68
        }, {
            name: '昆明',
            value: 45
        }, {
            name: '成都',
            value: 49
        }, {
            name: '拉萨',
            value: 66
        }, {
            name: '天津',
            value: 86
        }, {
            name: '合肥',
            value: 58
        }, {
            name: '呼和浩特',
            value: 59
        }, {
            name: '哈尔滨',
            value: 95
        }, {
            name: '南宁',
            value: 89
        }, {
            name: '南昌',
            value: 48
        }, {
            name: '乌鲁木齐',
            value: 49
        }];
        const convertData = (data) => {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };

        const randomValue = () => {

            return Math.round(Math.random() * 1000);
        }

        let option = {
            geo: {
                map: mapTyp,
                roam: false,
                label: {
                    normal: {
                        show: false,
                        textStyle: {
                            color: 'rgba(0,0,0,0.4)'
                        }
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#163355',
                        borderColor: '#0174AA'
                        // areaColor: {
                        //     image: this.wad.nativeElement,
                        //     repeat:'repeat'
                        // }
                    },
                    emphasis: {
                        areaColor: '#323c48',//地图省份滑动显示颜色
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                zlevel: -1
            },
            // graphic: [{
            //     id: 'football-ground',
            //     type: 'image',
            //     style: {
            //         image: "images/light.svg",
            //         width: 100,
            //         height: 100,
            //         x: 0,
            //         y: 0
            //     },
            //     left: 0,
            //     top: 0
            // }],
            series: [
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    symbolSize: 5,
                    rippleEffect: {
                        period: 3,
                        scale: 15,
                        brushType: 'fill'
                    },
                    symbol: "image://images/light.svg",
                    itemStyle: {
                        normal: {
                            color: 'green',
                            borderColor: 'transparent',
                            borderWidth: 1,
                            // borderType: 'solid',
                            shadowBlur: 20,
                            shadowColor: '#E4007F',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0
                        }
                    },
                    hoverAnimation: false,
                    legendHoverLink: false,
                    zlevel: 5,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: convertData([
                        {
                            name: '南京',
                            value: 56
                        }, {
                            name: '北京',
                            value: 68
                        }, {
                            name: '上海',
                            value: 78
                        }, {
                            name: '深圳',
                            value: 20
                        }
                    ])
                }, {
                    type: 'effectScatter',
                    showEffectOn: 'emphasis',
                    coordinateSystem: 'geo',
                    zlevel: 4,
                    rippleEffect: {
                        period: 2,
                        brushType: 'stroke',
                        scale: 0
                    },
                    symbol: 'path://M10.946,7.999c0,1.628-1.319,2.947-2.947,2.947l0,0c-1.627,0-2.946-1.318-2.946-2.947l0,0c0-1.627,1.319-2.946,2.946-2.946l0,0C9.627,5.053,10.946,6.372,10.946,7.999L10.946,7.999z',
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            color: 'green',
                            opacity: 0.9
                        }
                    },
                    data: convertData(list)
                }
            ]
        };
        this._mapService.getMapData(mapTyp).subscribe(mapjson => {

            echarts.registerMap(mapTyp, mapjson);
            this.chart.setOption(option);

            // let reverse: boolean = false;
            // const maxSize = 10;
            // const minSize = 7;
            // const effect = 1;
            // console.log(this.chart);
            // setInterval(() => {
            //     // ↑
            //     if (!reverse && option.series[0].symbolSize < maxSize) {
            //         option.series[0].symbolSize += effect;
            //     } else if (option.series[0].symbolSize >= maxSize) {
            //         reverse = true;
            //     }
            //     // ↓
            //     if (reverse && option.series[0].symbolSize >= minSize) {
            //         option.series[0].symbolSize -= effect;
            //     } else if (option.series[0].symbolSize <= minSize) {
            //         reverse = false;
            //     }

            //     this.chart.setOption(option);
            // }, 75)
        });
    }

    ngOnInit() {
        this.chart = echarts.init(this.activeMap.nativeElement);
    }

    ngOnChanges(changes: SimpleChanges): void {
        let currentValue = changes['options'].currentValue;
        let _opt: AppOptions = Object.assign(currentValue, {});
        if (_opt.init) {

            this._httpService.getData('/app/user-region/1').subscribe(data => {

                this._initMap(data);
            });
        }
    }
}