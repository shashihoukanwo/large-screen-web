import {Component,OnInit,Input} from '@angular/core';
import {KeyUrlService} from "./key-url.service";
@Component({
    selector:'key-url',
    styleUrls:['key-url.component.css'],
    templateUrl:'key-url.component.html'
})
export class KeyUrlComponent implements OnInit{
    @Input()
    keyUrlConfig:KeyUrlConfig;//key url 配置对象
    @Input()
    keyUrlList:KeyUrl[];//关键请求列表

    flag = false;//是否配置标记
    configShowFlag = false;//是否显示弹窗标记
    keyUrlListFlag = false;//是否显示关键请求列表


    constructor(private keyUrlService:KeyUrlService){

    };

    ngOnInit(){
        //初始化配置对象
        if(!this.keyUrlConfig){
            this.keyUrlConfig = {} as KeyUrlConfig;
        }
    };

    /**
     *提交
     */
    submit(){
        this.hide("configShowFlag");
        this.show("flag");
        console.log(this.keyUrlConfig);
    }
    /**
     * 选择关键请求
     * @param id 关键请求id
     */
    choseKeyUrl(keyUrl:KeyUrl){
        this.keyUrlConfig.keyUrlId = keyUrl.id;
        this.keyUrlConfig.keyUrlName = keyUrl.name;
        this.hide("keyUrlListFlag");
    }
    /**
     * 显示
     */
    show(flag:string){
        this[flag] = true;
    };

    /**
     * 隐藏
     */
    hide(flag:string){
        this[flag] = false;
    }

}
//大屏 key-url 配置对象
export class KeyUrlConfig{
    name:string;
    keyUrlId:number;
    keyUrlName:string;
}
//关键请求对象
export class KeyUrl{
    name:string;
    id:number;
}