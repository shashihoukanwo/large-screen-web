import { Injectable } from '@angular/core'
import {Observable} from "rxjs";
import {Http,Headers,RequestOptions,Response } from "@angular/http";
import {ConfigProduct} from "./config-product";
import { Config }    from './config-configuration';

@Injectable()
export class ConfigListService{

    constructor(private http:Http){

    }

    getConfList():Observable<Config[]>{
        const url = `/config-api/config/list`;
        console.log(url);
        return this.http.get(url)
            .map(response=>response.json().data.list as Config[])
            .catch(error => {
                console.log(error);
                return Observable.of<Config[]>();
            });
    }

    getProductList():Observable<ConfigProduct[]>{
        const url = `/config-api/config/products`;
        console.log(url);
        return this.http.get(url)
            .map(response=>response.json().data.list as ConfigProduct[])
            .catch(error => {
                console.log(error);
                return Observable.of<ConfigProduct[]>();
            });
    }

    create(config: Config): Observable<Config[]> {
        const url = `/config-api/config/save`;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        console.log(url);
        console.log(JSON.stringify(config));
        let postdata = 'templateId='+config.templateId+'&name='+config.name+'&applictionId='+config.applictionId
            +'&type='+config.type+'&configuration='+config.configuration;
        return this.http.post(url, postdata, options)
            .map(response=>response.json().data.list as Config[])
            .catch(this.handleError);
    }

    del(id: number): Observable<Config[]> {
        const url = `/config-api/config/del/`+id;
        console.log(url);
        return this.http.get(url)
            .map(response=>response.json().data.list as Config[])
            .catch(error => {
                console.log(error);
                return Observable.of<Config[]>();
            });
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}