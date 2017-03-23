///<reference path="../app-common/class/app-options.ts"/>
import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RumAppConfigService } from "./rumapp.config.service";
import { Http } from "@angular/http";
import { RumAppConf } from "./rumapp-conf";
import { AppOptions } from '../app-common/class/app-options';
@Component({
    selector: 'app-rumapp',
    templateUrl: './rumapp.component.html',
    styles: [require('./rumapp.component.css')]
})
export class RumappComponent implements OnInit, AfterViewInit {
    appId: number;
    timePeriod = 30;
    appConf = {} as RumAppConf;
    constructor(private http: Http,
        private route: ActivatedRoute,
        private appConfService: RumAppConfigService) {

    }

    public keyOptions: AppOptions[] = [];
    public centerMapOptions: AppOptions = {} as AppOptions;
    public crashOptions: AppOptions = {} as AppOptions;
    public httpCodeOptions: AppOptions = {} as AppOptions;
    public hijackOptions: AppOptions = {} as AppOptions;
    public activeMapOptions:AppOptions={} as AppOptions;
    public responseTimeOptions:AppOptions = {} as AppOptions;
    public networkErrorOptions:AppOptions = {} as AppOptions;
    public averageTimeOptions:AppOptions = {} as AppOptions;

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            let times = params['timePeriod'];
            if (times) {
                this.timePeriod = +times;
            }
        });
        this.route.params
            .map(params => this.appConfService.getConf(params['id']))
            .subscribe((data) => {
                data.subscribe(data => {
                    this.appConf = data;
                    this.initKeyMap(this.appConf);
                    this.initCrash(this.appConf);
                    this.initHttpCode(this.appConf);
                    this.initDnsHijack(this.appConf);
                    this.initResponseTime(this.appConf);
                    this.initNetworkError(this.appConf);
                    this.initAverageTime(this.appConf);
                });
            });
    }

    ngAfterViewInit() {

    }

    private initKeyMap(conf: RumAppConf): void {
        this.keyOptions = [];
        let i = 0;
        for (let keyId of conf.keyUrls) {
            let option = {} as AppOptions;
            option.paramsMap = new Map();
            option.paramsMap.set("id", conf.id);
            option.paramsMap.set("map", conf.map.type);
            option.paramsMap.set("regionId", conf.map.regionId);
            option.paramsMap.set("keyId", keyId);
            option.legendMax = conf.map.legendMax;
            option.colors = this.appConfService.getKeyMapColors();
            let legendColor = this.appConfService.getKeyItemColors()[i];
            option.legendColor = legendColor;
            option.url = `/app/performance-key-region/${keyId}`;
            option.interval = conf.interval;
            option.init = true;
            this.keyOptions.push(option);
            i++;
        }

        //CenterMap
        let _cOptinos: AppOptions = {} as AppOptions;
        _cOptinos.paramsMap = new Map();
        _cOptinos.paramsMap.set("id", conf.id);
        _cOptinos.paramsMap.set("map", conf.map.type);
        _cOptinos.paramsMap.set("regionId", conf.map.regionId);
        _cOptinos.interval = conf.interval;
        _cOptinos.legendMax = conf.map.legendMax;
        _cOptinos.colors = this.appConfService.getKeyMapColors();
        _cOptinos.url = `/performance-region/1`;
        _cOptinos.init = true;
        this.centerMapOptions = _cOptinos;

        //ActiveMap
        let actOptinos: AppOptions = {} as AppOptions;
        actOptinos.paramsMap = new Map();
        actOptinos.paramsMap.set("id", conf.id);
        actOptinos.paramsMap.set("map", conf.map.type);
        actOptinos.paramsMap.set("regionId", conf.map.regionId);
        actOptinos.interval = conf.interval;
        actOptinos.legendMax = conf.map.legendMax;
        actOptinos.colors = this.appConfService.getKeyMapColors();
        actOptinos.url = `/app/performance-key-region/1`;
        actOptinos.init = true;
        this.activeMapOptions = _cOptinos;
    }

    /**
     * 崩溃初始化
     */
    private initCrash(conf: RumAppConf): void {
        let crashOption = {} as AppOptions;
        crashOption.paramsMap = new Map();
        crashOption.paramsMap.set("id", conf.id);
        crashOption.url = `/app/crash/${conf.id}`;
        crashOption.interval = conf.interval;
        crashOption.crashIndex = conf.pieces.crash;
        crashOption.init = true;
        this.crashOptions = crashOption;
    }
    /**
     * httpcode组件初始化
     */
    private initHttpCode(conf: RumAppConf): void {
        let httpCodeOption = {} as AppOptions;
        httpCodeOption.paramsMap = new Map();
        httpCodeOption.paramsMap.set("id", conf.id);
        httpCodeOption.url = `/app/http-code/${conf.id}`;
        httpCodeOption.interval = conf.interval;
        httpCodeOption.httpCodeIndex = conf.pieces.httpCode;
        httpCodeOption.init = true;
        this.httpCodeOptions = httpCodeOption;
    }
    /**
     * 劫持组件初始化
     */
    private initDnsHijack(conf: RumAppConf): void {
        let hijackOption = {} as AppOptions;
        hijackOption.paramsMap = new Map();
        hijackOption.paramsMap.set("id", conf.id);
        hijackOption.url = `/app/dns-hijack/${conf.id}`;
        hijackOption.interval = conf.interval;
        hijackOption.init = true;
        this.hijackOptions = hijackOption;
    }
    /**
     * responseTime组件初始化
     */
    private initResponseTime(conf: RumAppConf): void{
        let responseTimeOption = {} as AppOptions;
        responseTimeOption.paramsMap = new Map();
        responseTimeOption.paramsMap.set("id", conf.id);
        responseTimeOption.url = `/performance-response-time/${conf.id}`;
        responseTimeOption.interval = conf.interval;
        responseTimeOption.init = true;
        this.responseTimeOptions = responseTimeOption;
    }

    /**
     * networkError组件初始化
     */
    private initNetworkError(conf: RumAppConf): void{
        let networkErrorOption = {} as AppOptions;
        networkErrorOption.paramsMap = new Map();
        networkErrorOption.paramsMap.set("id", conf.id);
        networkErrorOption.url = `/performance-network-error/${conf.id}`;
        networkErrorOption.interval = conf.interval;
        networkErrorOption.init = true;
        this.networkErrorOptions = networkErrorOption;
    }

    /**
     * averageTime组件初始化
     */
    private initAverageTime(conf: RumAppConf): void{
        let averageTimeOption = {} as AppOptions;
        averageTimeOption.paramsMap = new Map();
        averageTimeOption.paramsMap.set("id", conf.id);
        averageTimeOption.url = `/performance-average-time/${conf.id}`;
        averageTimeOption.interval = conf.interval;
        averageTimeOption.init = true;
        this.averageTimeOptions = averageTimeOption;
    }
}
