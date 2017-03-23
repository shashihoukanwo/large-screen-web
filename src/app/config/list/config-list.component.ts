import { Component,OnInit } from '@angular/core';
import {ConfigListService} from "./config-list.service";
import { ConfigProduct } from './config-product';
import { Config }    from './config-configuration';
import { Router }                 from '@angular/router';
@Component({
  selector: 'config-list',
  styleUrls: ['config-list.component.css'],
  templateUrl: 'config-list.component.html',
  providers: [ConfigListService],
})
export class ConfigListComponent implements OnInit {

  condition_create = false;
  condition_charge = false;
  condition_config = true;
  errorMessage: string;

  configs : Config[];
  configProducts : ConfigProduct[];

  constructor(private configListService:ConfigListService,
              private router: Router) {}

  ngOnInit() {
    this.configList();

    this.configListService.getProductList().subscribe(data=>{
      this.configProducts =data;
    });
  }

  configList(){
    this.configListService.getConfList().subscribe(data=>{
      this.configs =data;
      this.showCreate();
    });
  }

  onCreate() {
    if(this.configProducts.length>0){
      this.condition_create = true;
    }else{
      this.condition_charge = true;
    }
  }

  showCreate(){
    if(this.configs.length>0){
      this.condition_config = false;
    }else{
      this.condition_config = true;
    }
  }

  onCloseCreate(){
    this.condition_create = false;
  }

  onCloseCharge(){
    this.condition_charge = false;
  }

  onDel(id:number){
    this.configListService.del(id).subscribe(data=>{
      this.configs =data;
      this.showCreate();
    });
  }

  onEdit(id:number){
    this.router.navigate(['config/app/model']);
  }

  model = new Config(1,1,1,false,'Dr IQ','');

  submitted = false;

  onSubmit() {
    this.configListService.create(this.model).subscribe(
        data  => {
          this.configs = data;
          this.showCreate();
          this.onCloseCreate();
        },
        error =>  this.errorMessage = <any>error);
  }

  showFormControls(form: any) {
    return form && form.controls['name'] &&
        form.controls['name'].value;
  }
}
