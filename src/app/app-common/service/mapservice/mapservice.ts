import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer'
import { HttpService } from '../http/http.service';
import { CacheService, CacheStoragesEnum } from 'ng2-cache/ng2-cache';

@Injectable()
export default class MapService {
    private root: string = "";
    private data: Observable<any>;
    private dataObserver: Observer<any>;

    constructor(
        private _Http: HttpService,
        private _cacheService: CacheService
    ) {

        this.data = new Observable(observer => this.dataObserver = observer);
    }

    getMapData(type: string = "china"): Observable<any> {

        // let fieUrl = `/echarts-map/${type}.json`;
        // return this._Http.getData(fieUrl, this.root);

        let cachekey = `mapcachekey${type}`;
        let exists: boolean = this._cacheService.exists(cachekey);
        if (exists) {
            let cache: any | null = this._cacheService.get(cachekey);
            return new Observable(observer => {

                observer.next(cache);
                observer.complete();
            });
        } else {
            let path = type;
            if (!(type.toLocaleLowerCase() == 'china' || type.toLocaleLowerCase() == 'world')) {
                path = `province/${type}`;
            }
            let fieUrl = `./echarts-map/${path}.json`;

            return this._Http.getData(fieUrl, this.root, false).map(resp => {
                const json = resp.json();
                let setSuccess: boolean = this._cacheService.set(cachekey, json);
                return json;
            });
        }
    }
}   