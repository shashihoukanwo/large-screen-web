import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms'
import { ConfigAppModel1Component } from './model1/config-app-model1.component';
import { ConfigAppModel2Component } from './model2/config-app-model2.component';
import {ConfigAppModelRoutes} from './config-app-model.routes';

//TODO: 这个到底用没用... import {CommonModule} from '../../common/common.module';
import {UploadLogoComponent} from '../common/upload-logo/upload-logo.component';
import {KeyOptionComponent} from '../common/key-option/key-option.component';
import {KeyMustComponent} from '../common/key-must/key-must.component';
import {PerformanceMapComponent} from '../common/performance-map/performance-map.component';
import {CdnMapComponent} from '../common/cdn-map/cdn-map.component';
import {KeyUrlComponent} from '../common/key-url/key-url.component';

@NgModule({
    declarations: [
        ConfigAppModel1Component,ConfigAppModel2Component,
        UploadLogoComponent,KeyOptionComponent,KeyMustComponent,PerformanceMapComponent,CdnMapComponent,KeyUrlComponent

  //      ProportionPipe
    ],
    imports: [
        CommonModule,FormsModule,
        ConfigAppModelRoutes
    ],
    exports:[],
    entryComponents:[]
})
export class ConfigAppModelModule { }