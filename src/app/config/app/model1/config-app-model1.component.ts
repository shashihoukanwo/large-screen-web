import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {KeyUrlService} from "../../common/key-url/key-url.service";
import {KeyUrl} from "../../common/key-url/key-url.component";

@Component({
    selector: 'config-app-model1',
    styleUrls: ['./css/style.css', './css/screen.css'],
    templateUrl: './config-app-model1.component.html',
    providers: [KeyUrlService]
})
export class ConfigAppModel1Component implements OnInit {

    keyUrlList: KeyUrl[];//当前应用的关键请求
    constructor(private keyUrlService:KeyUrlService) {
    }

    ngOnInit() {
        //获取关键请求列表
        this.keyUrlService.getKeyUrls().subscribe(data => {
            this.keyUrlList = data;
        });
    }

}
