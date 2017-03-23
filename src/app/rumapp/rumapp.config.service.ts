/**
 * Created by Administrator on 2017/3/6.
 */
import { Injectable } from '@angular/core'
import { Observable } from "rxjs";
import { RumAppConf } from "./rumapp-conf";
import { Http } from "@angular/http";
interface RootPath {
    conf: string,
    api: string
}
/*
* 关键项颜色序列
* */
const keyItemColors: string[] = ["#9393c6", "#2aa6d6", "#66bd8f", "#68b960", "#deca57", "#da874a", "#e9618e", "#e7435f"];
//关键项地图背景颜色序列
const keyMapColors: string[] = ['#E9625D', '#DB874B', '#DECA57', '#A3C06E', '#69b960'];
//CDN以及中央大图的颜色序列
const centerMapColors: string[] = ['#69B960', '#A3C06E', '#DECA57', '#DB874B', '#E9625D'];
@Injectable()
export class RumAppConfigService {

    constructor(
        private http: Http
    ) {
        this.rootPath = {} as RootPath;
        this.rootPath.conf = window['config']['confUrl'];
        this.rootPath.api = window['config']['rumappUrl'];
    }
    rootPath: RootPath;
    getApiUrl(): string {
        return this.rootPath.api;
    }
    getKeyItemColors(): string[] {
        return keyItemColors;
    }
    getKeyMapColors(): string[] {
        return keyMapColors;
    }
    getCenterMapColors(): string[] {
        return centerMapColors;
    }

    getConf(id: number): Observable<RumAppConf> {
        const url = `${this.rootPath.conf}/config/${id}`;
        return this.http.get(url)
            .map(response => response.json() as RumAppConf)
    }
}