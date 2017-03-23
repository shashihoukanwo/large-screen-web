import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { RumappComponent } from './rumapp.component';
import { DymapComponent } from '../app-common/dymap/dymap.component';
import { CrashComponent } from '../app-common/crash/crash.component';
import { HttpService } from '../app-common/service/http/http.service';
import { HttpCodeComponent } from '../app-common/httpcode/httpcode.component';
import { CentermapModule } from '../app-common/centermap/centermap.module';
import { ActivemapComponent } from '../app-common/activemap/activemap.component';
import { RstimeComponent } from '../app-common/rstime/rstime.component';
import { NeterrorComponent } from '../app-common/neterror/neterror.component';
import { AvgtimeComponent } from '../app-common/avgtime/avgtime.component';
import { HijackComponent } from '../app-common/hijack/hijack.component';
import { RumAppConfigService } from './rumapp.config.service';
import { PercentagePipe } from '../app-common/pipes/percentage.pipe';
import { unitConverterPipe } from '../app-common/pipes/unit-converter.pipe';
import { HeaderComponent } from '../common/header/header.component';
@NgModule({
  imports: [
    CommonModule,
    CentermapModule,
    RouterModule.forChild([
      { path: '', component: RumappComponent }
    ])
  ],
  declarations: [
    RumappComponent,
    DymapComponent,
    CrashComponent,
    HttpCodeComponent,
    ActivemapComponent,
    RstimeComponent,
    NeterrorComponent,
    AvgtimeComponent,
    HijackComponent,
    PercentagePipe,
    unitConverterPipe,
    HeaderComponent
  ],
  providers: [HttpService, RumAppConfigService]
})
export class RumappModule { }
