import { Inject,Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RumAppConfigService } from '../../../rumapp/rumapp.config.service';

@Injectable()
export class HttpService {
    private root: string;
    constructor(private http: Http,private configService:RumAppConfigService) {

        this.root = configService.getApiUrl();
    }

    public get(url:string,data:Map<string,any>,root: string = this.root){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params = new URLSearchParams();
        data.forEach(function(v,k){
            params.set(k,v);
        });
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(root + url,{ search: params})
                   .map((resp: Response) => resp.json());
    }
    public getData(api: string, root: string = this.root,map:boolean=true): Observable<any> {

        let obs:Observable<any> = this.http.get(root + api);
        if(map) obs=obs.map((resp: Response) => resp.json());

        return obs;
    }
    public postData(api: string, data: any, root: string = this.root): Observable<any> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(data);
        console.log(body);
        return this.http.post(root + api, body, headers)
                   .map((resp: Response) => resp.json());
    }
}