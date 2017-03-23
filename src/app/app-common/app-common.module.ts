import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DymapComponent } from './dymap/dymap.component';
import { CrashComponent } from './crash/crash.component';
import { HttpCodeComponent } from './httpcode/httpcode.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DymapComponent, CrashComponent, HttpCodeComponent]
})
export class AppCommonModule { }
