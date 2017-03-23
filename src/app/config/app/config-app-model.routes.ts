import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigAppModel1Component } from './model1/config-app-model1.component';
import { ConfigAppModel2Component } from './model2/config-app-model2.component';

const routesConfigAppModel:Routes=[
    {
        path: "", redirectTo: "1", pathMatch: "full"
    }, {
        path:'1',component:ConfigAppModel1Component,children:[]
    },{
        path:'2',component:ConfigAppModel2Component,children:[]
    }
];

const routingConfigAppModel=RouterModule.forChild(routesConfigAppModel);

@NgModule({
    imports:[routingConfigAppModel],
    exports:[RouterModule]
})
export class ConfigAppModelRoutes{ }