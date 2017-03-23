import {Injectable} from '@angular/core'
import {Http} from "@angular/http";
import {Observable} from "rxjs"
import {KeyUrl} from "./key-url.component";
interface RootPath{
    conf:string;
    api:string;
}
@Injectable()
export class KeyUrlService {
    private rootPath:RootPath;
    constructor(private http: Http) {
        this.rootPath = {} as RootPath;
        this.rootPath.conf = window['config']['confUrl'];
        this.rootPath.api = window['config']['rumappUrl'];
    }
    //获取关键请求列表
    getKeyUrls(): Observable<KeyUrl[]> {
        //TODO:修改为正式地址
        const url = `${this.rootPath.api}/key-url-list`;
        return this.http.get(url)
            .map(response => {
                return response.json() as KeyUrl[]})
            .catch(error => {
                console.log(error);
                return Observable.of<KeyUrl[]>();
            });

    }
}