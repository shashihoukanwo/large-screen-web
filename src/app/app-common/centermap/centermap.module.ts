import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CentermapComponent } from './core/centermap.component';
import { ColorlumpComponent } from './components/colorlump.component';
import { ScalelineComponent } from './components/scaleline.component';
import { CdnmapComponetns } from './components/cdnmap.components';
import MapService from '../service/mapservice/mapservice';
import RangeService from '../service/mapservice/range.service';
import { CutnumberPipe } from '../pipes/proportion.pipe';
import { CounterComponent } from './components/counter.component';
@NgModule({
    //导入需要的模块
    imports: [
        CommonModule
    ],
    //声明内部成员components/directives/pipes
    declarations: [
        CutnumberPipe,
        CounterComponent,   //DAU显示器
        CentermapComponent, //核心地图(大)
        ScalelineComponent, //刻度线
        ColorlumpComponent, //色块
        CdnmapComponetns    //底部地图(小)
    ],

    //提供内部成员能够访问的service
    providers: [
        MapService,
        RangeService
    ],
    //暴露成员给外部使用
    exports: [
        CentermapComponent,
        ColorlumpComponent,
        ScalelineComponent,
        CdnmapComponetns,
        CounterComponent
    ]
})
export class CentermapModule { }