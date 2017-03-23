import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about.routes';
import { CentermapComponent } from '../app-common/centermap/core/centermap.component';
import { ActivemapComponent } from '../app-common/activemap/activemap.component';
import { CentermapModule } from '../app-common/centermap/centermap.module';
import { HttpService } from '../app-common/service/http/http.service';
import { ProportionPipe } from '../app-common/pipes/proportion.pipe';
import { DymapComponent } from '../app-common/dymap/dymap.component';

import MapService from '../app-common/service/mapservice/mapservice';
import { RumAppConfigService } from '../rumapp/rumapp.config.service';
import GeoTransformService from '../app-common/service/geo-transform.service';
// import { CounterComponent } from '../app-common/centermap/components/counter.component';
@NgModule({
    declarations: [
        AboutComponent,
        // AboutTestComponent,
        // ActivemapComponent,
        // DymapComponent,
        // CounterComponent,
        ProportionPipe,
    ],
    imports: [
        CommonModule,
        CentermapModule,
        AboutRoutingModule
    ],
    providers: [
        HttpService,
        MapService,
        RumAppConfigService,
        GeoTransformService
    ]

})
export class AboutModule { }