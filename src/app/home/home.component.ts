import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(){
    // let worker = new Worker('./worker/worker.service.js');
    // worker.postMessage("abc");//worker新线程向主线程发送数据
    // worker.onmessage = function (event) {//接收主线程发送过来的数据

    //     console.log(event.data.msg);
    // }
  }

}
