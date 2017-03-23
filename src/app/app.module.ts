import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { HomeComponent } from './home/home.component';
import { LsConfigComponent } from './config/ls-config.component'
import { ConfigListComponent } from './config/list/config-list.component'
import GeoTransformService from './app-common/service/geo-transform.service';
import { CacheService, CacheStoragesEnum } from 'ng2-cache/ng2-cache';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LsConfigComponent,
    ConfigListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [GeoTransformService, CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
