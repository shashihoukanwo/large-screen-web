import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LsConfigComponent } from './config/ls-config.component'
import { ConfigListComponent } from './config/list/config-list.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  { path: 'rumapp/:id', loadChildren: './/rumapp/rumapp.module#RumappModule' },
  {
    path: 'config', component: LsConfigComponent, children: [
      { path: "", redirectTo: "list", pathMatch: "full" },
      { path: 'list', component: ConfigListComponent },
      { path: 'view', component: HomeComponent },
      { path: 'app/model', loadChildren: './config/app/config-app-model.module#ConfigAppModelModule' },
    ]
  },
  { path: '', component: HomeComponent }
];
const routing = RouterModule.forRoot(routes, { useHash: true });

@NgModule({
  imports: [routing],
  exports: [RouterModule]
})
export class AppRoutingModule { }
